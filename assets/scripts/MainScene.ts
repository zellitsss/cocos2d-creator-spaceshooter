// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletPool from "./BulletPool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {
    @property(cc.Node)
    ship: cc.Node = null;
    
    @property
    speed = 400;

    @property
    shootCooldown = 1;

    targetLocation = new cc.Vec2(0, 0);

    isMoving: boolean = false;

    scoreLabel: cc.Label = null

    score: number = 0;

    onLoad () {
        this.scoreLabel = this.node.getChildByName("Score").getComponent(cc.Label);
    }

    start () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on('rock-is-detroyed', this.increaseScore, this);

        this.schedule(this.shoot, this.shootCooldown);

        this.scoreLabel.string = '0';
    }

    update (dt) {
        if (this.isMoving) {
            let direction = this.targetLocation.sub(this.ship.getPosition());
            let distance = direction.mag();
            if (distance < 10)
            {
                this.isMoving = false;
            } else {
                this.ship.setPosition(this.ship.getPosition().add(direction.normalize().mul(this.speed * dt)));
            }
        }
    }

    shoot()
    {
        this.node.getComponent(BulletPool).generateBullet(this.ship.getPosition());
    }

    onTouchStart(event : cc.Event.EventTouch) {
        let touches = event.getTouches();
        this.targetLocation = this.node.convertToNodeSpaceAR(touches[0].getLocation());
        this.isMoving = true;
    }

    onTouchMove(event : cc.Event.EventTouch) {
        let touches = event.getTouches();
        this.targetLocation = this.node.convertToNodeSpaceAR(touches[0].getLocation());
        this.isMoving = true;
    }

    onTouchEnd(event : cc.Event.EventTouch) {
        this.isMoving = false;
    }

    increaseScore() {
        ++this.score;
        this.scoreLabel.string = this.score.toString();
    }
}
