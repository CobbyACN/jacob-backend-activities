import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";   // <-- add this import

export default class Home extends Controller {

    public onInit(): void {
        // Demo Data
        const oVizModel = new JSONModel({
            SalesData: [
                { Month: "January", Value: 10 },
                { Month: "February", Value: 15 },
                { Month: "March", Value: 20 },
                { Month: "April", Value: 25 },
                { Month: "May", Value: 30 }
            ]
        });

        this.getView()!.setModel(oVizModel, "viz");
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