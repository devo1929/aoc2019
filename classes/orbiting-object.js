/**
 * @property name {string}
 * @property orbiting {OrbitingObject}
 * @property orbiters {OrbitingObject}
 */
class OrbitingObject {

    /**
     * @param name {string}
     */
    constructor(name) {
        this.name = name;
        this.orbiting = null;
        this.orbiters = [];
    }

    /**
     * @param orbiter {OrbitingObject}
     *
     * @return {OrbitingObject}
     */
    addOrbiter(orbiter) {
        const idx = this.findIndex(orbiter);
        if (idx === -1) {
            this.orbiters.push(orbiter);
        }
        orbiter.orbiting = this;
        return orbiter;
    }

    /**
     * @param orbiter {OrbitingObject}
     *
     * @return {number}
     */
    findIndex(orbiter) {
        return this.orbiters.findIndex(o => o.name === orbiter.name);
    }

    /**
     * @param orbitingObject {OrbitingObject}
     *
     * @return {boolean}
     */
    isMutualTo(orbitingObject) {
        for(let i = 0; i < this.orbiters.length; i++) {
            const orbiter = this.orbiters[i];
            if(orbiter === orbitingObject || orbiter.isMutualTo(orbitingObject)) {
                return true;
            }
        }
        return false;
    }
}

module.exports = OrbitingObject;
