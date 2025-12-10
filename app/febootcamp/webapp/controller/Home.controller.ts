import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace febootcamp.controller
 */
export default class Home extends Controller {

    public onInit(): void {
      
    }

    public onButtonPress(): void {
   
        MessageBox.show("Nice to meet you!", {
            title: "Hello World",
            icon: MessageBox.Icon.NONE,  
            actions: [MessageBox.Action.OK], 
        });
    }

    public onGoToPage2(): void {

        const oRouter = UIComponent.getRouterFor(this);
        
        
        oRouter.navTo("PageTwo");
    }
}
