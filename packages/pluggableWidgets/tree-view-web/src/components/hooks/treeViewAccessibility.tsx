import { EventHandler, SyntheticEvent, useCallback, useMemo } from "react";
import { TreeViewState } from "../TreeView";
import { KeyboardHandlerHook, useKeyboardHandler } from "./useKeyboardHandler";

export const enum FocusTargetChange {
    FIRST = "FIRST",
    LAST = "LAST",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT"
}

export type TreeViewFocusChangeHandler = (
    targetElement: EventTarget | null,
    focusTargetChange: FocusTargetChange,
    traverseOption?: "HORIZONTAL" | "VERTICAL"
) => void;

export const useTreeViewFocusChangeHandler = (): TreeViewFocusChangeHandler => {
    return useCallback((targetElement, focusTargetChange, traverseOption) => {
        if (targetElement && targetElement instanceof Element) {
            const getTreeViewHeadersInElement = (el: Element | Document | null): HTMLElement[] => {
                if (el) {
                    const allBranches = Array.from(el.querySelectorAll<HTMLElement>("li.widget-tree-view-branch"));
                    const hiddenBodies = Array.from(el.querySelectorAll(".widget-tree-view-body[aria-hidden=true]"));
                    return allBranches.filter(node => !hiddenBodies.some(hiddenBody => hiddenBody.contains(node)));
                }
                return [];
            };

            const currentTreeViewScope = Array.from(
                document.body.querySelectorAll(".widget-tree-view[role=tree]")
            ).find(element => element.contains(targetElement));

            if (!currentTreeViewScope) {
                return;
            }

            const targetableBranches = getTreeViewHeadersInElement(currentTreeViewScope);

            const numberOfTargetableBranches = targetableBranches.length;
            if (numberOfTargetableBranches === 0) {
                return;
            }

            const currentBranchIndex = targetableBranches.findIndex(branch => branch.isSameNode(targetElement));

            switch (focusTargetChange) {
                case FocusTargetChange.FIRST:
                    targetableBranches[0].focus();
                    break;
                case FocusTargetChange.LAST:
                    targetableBranches[numberOfTargetableBranches - 1].focus();
                    break;
                case FocusTargetChange.PREVIOUS: {
                    if (traverseOption === "VERTICAL") {
                        const parentTreeViewHeaders = getTreeViewHeadersInElement(document).filter(node =>
                            node.lastElementChild?.contains(targetElement)
                        );
                        if (parentTreeViewHeaders.length > 0) {
                            parentTreeViewHeaders[parentTreeViewHeaders.length - 1].focus();
                        }
                        return;
                    }
                    const newBranchIndex = currentBranchIndex - 1;
                    const newBranchIndexProcessed = Math.max(newBranchIndex, 0);
                    if (newBranchIndexProcessed !== currentBranchIndex) {
                        targetableBranches[newBranchIndexProcessed].focus();
                    }
                    break;
                }
                case FocusTargetChange.NEXT: {
                    if (traverseOption === "VERTICAL") {
                        const childTreeViewHeaders = getTreeViewHeadersInElement(targetElement.lastElementChild);
                        if (childTreeViewHeaders.length > 0) {
                            childTreeViewHeaders[0].focus();
                        }
                        return;
                    }
                    const newBranchIndex = currentBranchIndex + 1;
                    const newBranchIndexProcessed = Math.min(newBranchIndex, numberOfTargetableBranches - 1);
                    if (newBranchIndexProcessed !== currentBranchIndex) {
                        targetableBranches[newBranchIndexProcessed].focus();
                    }
                    break;
                }
            }
        }
    }, []);
};

export const useTreeViewBranchKeyboardHandler = (
    toggleTreeViewContent: EventHandler<SyntheticEvent<HTMLElement>>,
    changeFocus: TreeViewFocusChangeHandler,
    treeViewState: TreeViewState,
    isActualLeafNode: boolean,
    eventTargetIsNotCurrentBranch: (event: SyntheticEvent<HTMLElement>) => boolean
): ReturnType<KeyboardHandlerHook> => {
    const keyHandlers = useMemo<Parameters<KeyboardHandlerHook>[0]>(
        () => ({
            Enter: toggleTreeViewContent,
            Space: toggleTreeViewContent,
            Home: event => changeFocus(event.currentTarget, FocusTargetChange.FIRST),
            End: event => changeFocus(event.currentTarget, FocusTargetChange.LAST),
            ArrowUp: event => changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "HORIZONTAL"),
            ArrowDown: event => changeFocus(event.currentTarget, FocusTargetChange.NEXT, "HORIZONTAL"),
            ArrowRight: event => {
                if (
                    treeViewState === TreeViewState.COLLAPSED_WITH_CSS ||
                    treeViewState === TreeViewState.COLLAPSED_WITH_JS
                ) {
                    toggleTreeViewContent(event);
                } else if (treeViewState === TreeViewState.EXPANDED || isActualLeafNode) {
                    changeFocus(event.currentTarget, FocusTargetChange.NEXT, "VERTICAL");
                }
            },
            ArrowLeft: event => {
                if (
                    treeViewState === TreeViewState.COLLAPSED_WITH_CSS ||
                    treeViewState === TreeViewState.COLLAPSED_WITH_JS ||
                    isActualLeafNode
                ) {
                    changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "VERTICAL");
                } else if (treeViewState === TreeViewState.EXPANDED) {
                    toggleTreeViewContent(event);
                }
            }
        }),
        [toggleTreeViewContent, changeFocus, treeViewState, isActualLeafNode]
    );

    const keyboardHandler = useKeyboardHandler(keyHandlers);

    return useCallback(
        event => {
            if (eventTargetIsNotCurrentBranch(event)) {
                return;
            }
            return keyboardHandler(event);
        },
        [eventTargetIsNotCurrentBranch, keyboardHandler]
    );
};
