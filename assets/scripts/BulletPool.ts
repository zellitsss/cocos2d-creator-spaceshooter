// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletPool extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    bulletsContainer: cc.Node = null;

    pool: cc.NodePool = null;
    offset = new cc.Vec2(0, 60);

    onLoad () {
        let initSize = 5;
        this.pool = new cc.NodePool();
        for (let i = 0; i < initSize; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.pool.put(bullet);
        }
    }

    start () {
        this.node.on('bullet-out-of-screen', this.onBulletOutOfScreen, this);
    }

    // update (dt) {}

    generateBullet(position: cc.Vec2) {
        let bullet = null;
        if (this.pool.size() > 0) {
            bullet = this.pool.get();
            bullet.active = true;
        } else {
            bullet = cc.instantiate(this.bulletPrefab);
        }
        bullet.parent = this.bulletsContainer;
        bullet.setPosition(position.add(this.offset));
    }

    onBulletOutOfScreen(event: cc.Event.EventCustom) {
        event.getUserData().node.active = false;
        this.pool.put(event.getUserData().node);
    }
}
