"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * The root component for a collapsible section of content.
 * It is a direct export of the Radix UI Collapsible Root component.
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * A button or link that toggles the open/closed state of the collapsible content.
 * It is a direct export of the Radix UI Collapsible Trigger component.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * The content that is shown or hidden when the collapsible is toggled.
 * It is a direct export of the Radix UI Collapsible Content component.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
