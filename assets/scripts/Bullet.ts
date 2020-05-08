// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    speed = 600;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    }

    start () {
    }

    update (dt) {
        let canvas = cc.find('Canvas');
        
        if (this.node.position.y >= canvas.height /2 + this.node.height)
        {
            let customEvent = new cc.Event.EventCustom('bullet-out-of-screen', true);
            customEvent.setUserData({node: this.node});
            this.node.dispatchEvent(customEvent);
        }
        let direction = new cc.Vec2(0, 1 * this.speed * dt);
        this.node.setPosition(this.node.getPosition().add(direction));
    }

    onCollisionEnter(other, self) {
        if (other.tag == 3) {
            let customEvent = new cc.Event.EventCustom('bullet-out-of-screen', true);
            customEvent.setUserData({node: self.node});
            this.node.dispatchEvent(customEvent);
        }
    }
}
