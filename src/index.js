function removeJSXElement({ types: t }) {
    return {
        name: 'removeJSXElement',
        visitor: {
            JSXElement(path, state) {
                const elementNames = state.opts.elementNames || [];
                function toBeRemoved(elementName) {
                    return elementNames.indexOf(elementName) >= 0;
                }
                if (toBeRemoved(path.get('openingElement').get('name').get('name').node)) {
                    path.replaceWith(t.expressionStatement(t.nullLiteral()));
                }
            }
        }
    };
};

export default removeJSXElement;