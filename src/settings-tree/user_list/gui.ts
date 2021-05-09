/// <reference no-default-lib="true"/>
/// <reference path="../../../types/noppes.npcs/events/lib.CustomGui.d.ts"/>
import type { GEM } from "../../helper_toolkit/gui.ts";
/* spell-checker: disable-next-line  */
import { guiSizes } from "../../consts.ts"
/* spell-checker: disable-next-line  */
const guiInfo = guiSizes["customnpcs:largebg.png"];

export class guiInstance {
    api: NpcAPI;
    gui: ICustomGui;
    guiGem: GEM;
    pathBox: ITextField
    pathBoxGem: GEM
    userBox: ITextField
    userBoxGem: GEM
    permittedBox: ITextField
    permittedBoxGem: GEM
    noteBox: ITextField
    noteBoxGem: GEM
    permittedList: IScroll
    permittedListGem: GEM
    permittedListHeight: number;
    closeButton: IButton
    closeButtonGem: GEM
    userData: Record<string, Record<string, string>> = {};
    userID: string[] = [];
    worldPath = "";
    constructor(api: NpcAPI, guiGem: GEM, worldPath: string){
        this.api = api;
        // Gui Top Level
        {
            this.guiGem = guiGem;
            this.gui = this.api.createCustomGui(this.guiGem.id, guiInfo.x, guiInfo.y, false);
            this.gui.setBackgroundTexture(guiInfo.location);
        }
        let runningY = 0;
        // Path Box
        {
            this.pathBoxGem = this.guiGem.newChild();
            this.pathBox = this.gui.addTextField(this.pathBoxGem.id, 5, (runningY += 6), (guiInfo.x - 10), 20);
            this.worldPath = worldPath;
            this.pathBox.setText(worldPath + "/test.json");
            runningY += 20
        }
        // User Box
        {
            this.userBoxGem = this.guiGem.newChild();
            this.userBox = this.gui.addTextField(this.userBoxGem.id, 5, (runningY += 5), (guiInfo.x - 10), 20);
            runningY += 20
        }
        // Permitted Box
        {
            this.permittedBoxGem = this.guiGem.newChild();
            this.permittedBox = this.gui.addTextField(this.permittedBoxGem.id, 5, (runningY += 5), (guiInfo.x - 10), 20);
            runningY += 20
        }
        // Note Box
        {
            this.noteBoxGem = this.guiGem.newChild();
            this.noteBox = this.gui.addTextField(this.noteBoxGem.id, 5, (runningY += 5), (guiInfo.x - 10), 20);
            runningY += 20
        }
        // Permitted List
        {
            this.permittedListHeight = ((guiInfo.y - (runningY + 6 + 5))- 25)
            this.permittedListGem = this.guiGem.newChild();
            this.permittedList = this.gui.addScroll(this.permittedListGem.id, 5, (runningY += 5),
                                        (guiInfo.x - 10), this.permittedListHeight, []);
            runningY += this.permittedListHeight;
            this.permittedListGem.SetScrollEvent((e)=>this.scrollPlayerList(e));
        }
        // Close Button
        {
            this.closeButtonGem = this.guiGem.newChild();
            this.closeButton = this.gui.addButton(this.closeButtonGem.id, "Close", 5, (runningY + 5), (guiInfo.x - 10), 20);
            runningY += 20;
            this.closeButtonGem.SetButtonEvent((e)=>this.closeButtonClicked(e));
        }
    }

    showUserDetails(user: string): void{
        this.userBox.setText(user);
        this.gui.updateComponent(this.userBox);
        const permitted = this.userData[user]?.permitted || false;
        this.permittedBox.setText(permitted + "");
        this.gui.updateComponent(this.permittedBox);
        const note = this.userData[user]?.note || "";
        this.noteBox.setText(note);
        this.gui.updateComponent(this.noteBox);
        this.permittedList.setSize(this.permittedList.getWidth(), this.permittedListHeight);
        this.gui.updateComponent(this.permittedList);
    }

    initialShow(userData: Record<string, Record<string, string>>, player: string, error?: string){
        if(typeof error == "string"){
            this.userBox.setText(player);
            this.permittedBox.setText(false + "");
            this.noteBox.setText("Error: " + error);
            return this.gui;
        }
        this.userData = userData;
        this.showUserDetails(player);
        {
            this.userID = [];
            let n = 0;
            let isOnList: boolean | number = false;
            for(const user in userData){
                this.userID.push(user);
                if(user == player){
                    isOnList = n;
                }
                n++;
            }
            this.permittedList.setList(this.userID);
            if(typeof isOnList == "number"){
                this.permittedList.setDefaultSelection(isOnList);
            }
            this.permittedList.setSize(this.permittedList.getWidth(), this.permittedListHeight);
            this.gui.updateComponent(this.permittedList);
        }
        return this.gui;
    }

    scrollPlayerList(e: ScrollEvent){
        let sel: string = e.player.getName()
        if(e.selection[0]){
            sel = e.selection[0]
        }
        this.showUserDetails(sel);
        this.permittedList.setSize(this.permittedList.getWidth(), this.permittedListHeight);
        this.permittedList.setDefaultSelection(e.scrollIndex);
        this.gui.updateComponent(this.permittedList);
        this.gui.update(e.player);
    }

    closeButtonClicked(e: ButtonEvent){
        e.player.closeGui();
    }

}