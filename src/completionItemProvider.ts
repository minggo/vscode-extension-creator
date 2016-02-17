import {CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Range, Position} from 'vscode';
import cocosGlobals = require('./globals');

// implement cocos creator completions
// it only adds completions for cc.Component and xxx.node
// it will add the completions no matter of the context
export default class CocosCreatorCompletionItemProvider implements CompletionItemProvider {

	public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {
		let result: CompletionItem[] = [];
        
        if (position.character >= 5) {
            // check if the prefix is ' this.' or '.node.'
            var distance = position.character > 5 ? 6 : 5;
            var startPosition = new Position(position.line, position.character - distance);
            var range = new Range(startPosition, position);
            var prefix = document.getText(range);
            
            // add cc.Component to this
            if (prefix === 'this.' || prefix === ' this.') {
                this.addCompletion(result, cocosGlobals.componentFunctions, true);
                this.addCompletion(result, cocosGlobals.componentProperties, false);
            }
            
            // add cc.Node to xxx.node
            if (prefix === '.node.') {
                // add our completions
                this.addCompletion(result, cocosGlobals.nodeFunctions, true);
                this.addCompletion(result, cocosGlobals.nodeProperties, false);
            }
        }
      
		return Promise.resolve(result);
	}
    
    private addCompletion(completionItems: CompletionItem[], entries: cocosGlobals.IEntries, isFunction: boolean) : void {
        for (var name in entries) {
            var proposal: CompletionItem = new CompletionItem(name);
            proposal.kind = isFunction ? CompletionItemKind.Function : CompletionItemKind.Property;
            
            var entry: cocosGlobals.IEntry = entries[name];
            if (entry.description) {
                proposal.documentation = entry.description;
            }
            if (entry.signature) {
                proposal.detail = entry.signature
            }
            
            completionItems.push(proposal);
        }
    }
}
