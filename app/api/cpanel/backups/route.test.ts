import { POST, DELETE } from './route';
import type { NextRequest } from 'next/server';
import { AuthService } from '@/lib/auth';

// Mock the AuthService
jest.mock('@/lib/auth', () => ({
  AuthService: {
    verifyToken: jest.fn().mockResolvedValue({
      sub: 'user-123',
      role: 'admin',
      email: 'admin@example.com',
    }),
  },
}));

// A simplified mock for NextRequest to avoid constructor issues
function createMockRequest(method: string, body?: any, searchParams?: URLSearchParams): NextRequest {
  const url = `http://localhost/api/cpanel/backups${searchParams ? '?' + searchParams.toString() : ''}`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'authorization': 'Bearer test-token',
  });

  const request = {
    method,
    headers,
    url,
    json: async () => body || {},
    nextUrl: { searchParams: searchParams || new URLSearchParams() },
  } as unknown as NextRequest;

  return request;
}

describe('Backup API', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (AuthService.verifyToken as jest.Mock).mockResolvedValue({
      sub: 'user-123',
      role: 'admin',
      email: 'admin@example.com',
    });
  });

  describe('DELETE /api/cpanel/backups', () => {
    it('should not allow deleting a backup that is in progress', async () => {
      // 1. Create a new backup (which will be 'in_progress')
      const createRequest = createMockRequest('POST', { type: 'full', description: 'Test backup' });
      const createResponse = await POST(createRequest);
      const { backup } = await createResponse.json();

      expect(createResponse.status).toBe(201);
      expect(backup.status).toBe('in_progress');

      // 2. Immediately try to delete the backup
      const deleteParams = new URLSearchParams({ id: backup.id });
      const deleteRequest = createMockRequest('DELETE', null, deleteParams);
      const deleteResponse = await DELETE(deleteRequest);

      // 3. Assert that the API returns a 400 Bad Request
      expect(deleteResponse.status).toBe(400);
      const deleteBody = await deleteResponse.json();
      expect(deleteBody.error).toBe('Cannot delete a backup that is currently in progress.');
    }, 10000); // Increase timeout to handle simulated delay
  });
});
