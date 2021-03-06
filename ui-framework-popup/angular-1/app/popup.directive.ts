import * as angular from "angular";

export class PopupDirectiveController {
    private content: Node;

    constructor(private transclude: angular.ITranscludeFunction) {
    }

    $onInit() {
        this.transclude(clone => {            
            const popup = document.createElement("div");
            popup.className = "popup-overlay";
            for(let i = 0; i < clone.length; i++) {
                popup.appendChild(clone[i]);
            }

            this.content = document.body.appendChild(popup);
        });
    }

    $onDestroy() {
        if (this.content) {
            document.body.removeChild(this.content)
            this.content = null;
        }
    }
}

export const name = "popup";

export const configuration: angular.IDirective = {
    controller: ["$transclude", PopupDirectiveController],
    replace: true,
    restrict: "E",
    transclude: true
};