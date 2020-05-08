// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOverScene extends cc.Component {

    start () {

    }

    onRestartButtonClicked(button: cc.Button) {
        cc.director.loadScene("main_scene");
    }

    onHomeButtonClicked(button: cc.Button) {
        cc.director.loadScene("start_scene");
    }

}
