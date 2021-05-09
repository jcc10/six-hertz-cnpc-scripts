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
    pathBox: ITextField
    userBox: ITextField
    permittedBox: ITextField
    noteBox: ITextField
    permittedList: IScroll
    permittedListHeight: number;
    userData: Record<string, Record<string, string>> = {};
    userID: string[] = [];

    constructor(api: NpcAPI, guiGem: GEM, worldPath: string){
        this.api = api;
        // Gui Top Level
        {
            this.gui = this.api.createCustomGui(guiGem.id, guiInfo.x, guiInfo.y, false);
            this.gui.setBackgroundTexture(guiInfo.location);
        }
        let runningY = 0;
        // Path Box
        {
            const pathBoxGem = guiGem.newChild();
            this.pathBox = this.gui.addTextField(pathBoxGem.id, 5, (runningY += 6), (guiInfo.x - 10), 20);
            this.pathBox.setText(worldPath + "/test.json");
            runningY += 20
        }
        // User Box
        {
            const userBoxGem = guiGem.newChild();
            this.userBox = this.gui.addTextField(userBoxGem.id, 5, (runningY += 5), (guiInfo.x - 10), 20);
            runningY += 20
        }
        // Permitted Box
        {
            const permittedBoxGem = guiGem.newChild();
            this.permittedBox = this.gui.addTextField(permittedBoxGem.id, 5, (runningY += 5), (guiInfo.x - 10), 20);
            runningY += 20
        }
        // Note Box
        {
            const noteBoxGem = guiGem.newChild();
            this.noteBox = this.gui.addTextField(noteBoxGem.id, 5, (runningY += 5), (guiInfo.x - 10), 20);
            runningY += 20
        }
        // Permitted List
        {
            this.permittedListHeight = ((guiInfo.y - (runningY + 6 + 5))- 25)
            const permittedListGem = guiGem.newChild();
            this.permittedList = this.gui.addScroll(permittedListGem.id, 5, (runningY += 5),
                                        (guiInfo.x - 10), this.permittedListHeight, []);
            runningY += this.permittedListHeight;
            permittedListGem.SetScrollEvent((e)=>this.scrollPlayerList(e));
        }
        // Close Button
        {
            const closeButtonGem = guiGem.newChild();
            this.gui.addButton(closeButtonGem.id, "Close", 5, (runningY + 5), (guiInfo.x - 10), 20);
            runningY += 20;
            closeButtonGem.SetButtonEvent((e)=>this.closeButtonClicked(e));
        }
    }

    getUserDetails(user: string): [string, string]{
        const permitted = this.userData[user]?.permitted || false + "";
        const note = this.userData[user]?.note || "";
        return [permitted, note];
    }

    showUserDetails(user: string, permitted: string, note: string){
        this.userBox.setText(user);
        this.gui.updateComponent(this.userBox);
        this.permittedBox.setText(permitted);
        this.gui.updateComponent(this.permittedBox);
        this.noteBox.setText(note);
        this.gui.updateComponent(this.noteBox);
        this.permittedList.setSize(this.permittedList.getWidth(), this.permittedListHeight);
        this.gui.updateComponent(this.permittedList);
    }

    initialShow(userData: Record<string, Record<string, string>>, player: string, error?: string){
        if(typeof error == "string"){
            this.userData = {};
            this.userID = [];
            this.permittedList.setList(this.userID);
            this.showUserDetails(player, false + "", "Error: " + error);
            return this.gui;
        }
        this.userData = userData;
        const [permitted, note] = this.getUserDetails(player);
        this.showUserDetails(player, permitted, note);
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
        const [permitted, note] = this.getUserDetails(sel);
        this.showUserDetails(sel, permitted, note);
        this.permittedList.setSize(this.permittedList.getWidth(), this.permittedListHeight);
        this.permittedList.setDefaultSelection(e.scrollIndex);
        this.gui.updateComponent(this.permittedList);
        this.gui.update(e.player);
    }

    closeButtonClicked(e: ButtonEvent){
        e.player.closeGui();
    }

}