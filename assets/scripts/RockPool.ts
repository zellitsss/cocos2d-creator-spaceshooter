// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {RandomBetween} from './Helper'

const {ccclass, property} = cc._decorator;

@ccclass
export default class RockPool extends cc.Component {

    @property(cc.Prefab)
    rockPrefab: cc.Prefab = null;

    @property(cc.Node)
    rocksContainer: cc.Node = null;

    pool: cc.NodePool = null;

    onLoad () {
        this.pool = new cc.NodePool();
        let initSize = 10;
        for (let i = 0; i < initSize; ++i) {
            let rock = cc.instantiate(this.rockPrefab);
            this.pool.put(rock);
        }
        this.schedule(this.generateRock, 0.5);
    }

    start () {
        this.node.on('rock-is-detroyed', this.onRockOutOfScreen, this);
    }

    generateRock() {
        let rock: cc.Node = null;
        if (this.pool.size() > 0) {
            rock = this.pool.get();
            rock.active = true;
        } else {
            rock = cc.instantiate(this.rockPrefab);
        }
        rock.parent = this.rocksContainer;
        let startPosition = this.node.convertToNodeSpaceAR(new cc.Vec2(RandomBetween(0, this.node.width), this.node.height + rock.height));
        let endPosition = this.node.convertToNodeSpaceAR(new cc.Vec2(RandomBetween(0, this.node.width), - rock.height));
        rock.getComponent('Rock').setRandomMovement(startPosition, endPosition);
    }

    onRockOutOfScreen(event : cc.Event.EventCustom) {
        cc.log(event.getUserData().node);
        event.getUserData().node.active = false;
        this.pool.put(event.getUserData().node);
    }
}
