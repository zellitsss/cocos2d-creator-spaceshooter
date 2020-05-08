// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {RandomBetween} from './Helper';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Rock extends cc.Component {

    @property
    minSpeed = 300;

    @property
    maxSpeed = 500;

    direction: cc.Vec2 = null;

    onLoad () {
    }

    start () {
    }

    update (dt) {
        let canvas = cc.find('Canvas');
        if (this.node.y >= canvas.height + this.node.height)
        {
            let customEvent = new cc.Event.EventCustom('rock-is-detroyed', true);
            customEvent.setUserData({node: this.node});
            this.node.dispatchEvent(customEvent);
        }
        let direction = this.direction.mul(dt);
        this.node.setPosition(this.node.getPosition().add(direction));
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag == 1) {
            cc.director.loadScene("game_over_scene");
        } else if (other.tag == 2) {
            let customEvent = new cc.Event.EventCustom('rock-is-detroyed', true);
            customEvent.setUserData({node: self.node});
            this.node.dispatchEvent(customEvent);
        }
    }

    setRandomMovement(startPos: cc.Vec2, endPos: cc.Vec2) {
        this.direction = endPos.sub(startPos).normalize().mul(RandomBetween(this.minSpeed, this.maxSpeed));
        this.node.setPosition(startPos);
    }
}
