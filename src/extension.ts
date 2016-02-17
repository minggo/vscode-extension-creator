'use strict';

import {ExtensionContext, languages} from 'vscode';
import CocosCreatorCompletionItemProvider from './completionItemProvider'

export function activate(context: ExtensionContext) {
    context.subscriptions.push(languages.registerCompletionItemProvider('javascript', new CocosCreatorCompletionItemProvider(), '.'));
}

// this method is called when your extension is deactivated
export function deactivate() {
}