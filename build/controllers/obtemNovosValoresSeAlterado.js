"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtemNovosValoresSeAlterado = void 0;
function obtemNovosValoresSeAlterado(story) {
    if (story && story.changes.filter(function (modificacao) { return modificacao.original_values.current_state !== modificacao.new_values.current_state; })) {
        story.changes.forEach(function (modificacao) {
            if (modificacao.new_values.current_state === "delivered") {
                return modificacao.new_values;
            }
        });
    }
    return undefined;
}
exports.obtemNovosValoresSeAlterado = obtemNovosValoresSeAlterado;
//# sourceMappingURL=obtemNovosValoresSeAlterado.js.map