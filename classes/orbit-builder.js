const OrbitingObject = require('./orbiting-object');

/**
 * @property inputs {string[]}
 * @property orbitMap {object}
 */
class OrbitBuilder {

    /**
     * @param inputs {string[]}
     */
    constructor(inputs) {
        this.inputs = inputs;
    }

    /**
     * @return {OrbitingObject}
     */
    build() {
        this.orbitMap = {};
        for (let i = 0; i < this.inputs.length; i++) {
            const input = this.inputs[i];
            this.buildFromInput(input);
        }
        return this.getRoot(this.orbitMap);
    }

    /**
     * @param orbitMap {object}
     *
     * @return {OrbitingObject}
     */
    getRoot(orbitMap) {
        return Object.values(orbitMap)
            .find(orbitingObject => {
                if (!orbitingObject.orbiting) {
                    return orbitingObject;
                }
            });
    }

    /**
     * @param input {string}
     *
     * @return {OrbitingObject}
     */
    buildFromInput(input) {
        const names = input.split(')');
        const orbitingObject = this.getOrCreate(names[0]);
        const orbiter = this.getOrCreate(names[1]);

        orbitingObject.addOrbiter(orbiter);

        return orbitingObject;
    }

    /**
     * @param name {string}
     *
     * @return {OrbitingObject}
     */
    getOrCreate(name) {
        let orbitingObject = this.orbitMap[name];
        if (!orbitingObject) {
            orbitingObject = new OrbitingObject(name);
            this.orbitMap[name] = orbitingObject;
        }
        return orbitingObject;
    }

    /**
     * @param orbitingObject {OrbitingObject}
     * @param index {number}
     *
     * @return {number}
     */
    countOrbits(orbitingObject, index = 0) {
        return orbitingObject.orbiters
            .reduce((count, orbiter) => {
                count += this.countOrbits(orbiter, index + 1);

                return count;
            }, index);
    }

    /**
     * @return {OrbitingObject}
     */
    getOrbitedObject(name) {
        const orbitingObject = this.orbitMap[name];
        return orbitingObject ? orbitingObject.orbiting : null;
    }

    /**
     * @return {OrbitingObject}
     */
    getYouOrbiting() {
        return this.getOrbitedObject('YOU');
    }

    /**
     * @return {OrbitingObject}
     */
    getSanOrbiting() {
        return this.getOrbitedObject('SAN');
    }

    /**
     * @return {number}
     */
    getOrbitalTransferCount() {
        const youObject = this.getYouOrbiting();
        const sanObject = this.getSanOrbiting();
        if (!youObject || !sanObject) {
            return -1;
        }

        const mutualOrbitingObject = this.findMutualOrbitingObject(youObject, sanObject);
        if (!mutualOrbitingObject) {
            return -1;
        }

        const youDistance = this.getDistance(mutualOrbitingObject, youObject);
        const sanDistance = this.getDistance(mutualOrbitingObject, sanObject);

        return sanDistance + youDistance;
    }

    /**
     * @param orbitingObjectA {OrbitingObject}
     * @param orbitingObjectB {OrbitingObject}
     * @param distance {number}
     *
     * @return {number}
     */
    getDistance(orbitingObjectA, orbitingObjectB, distance = 0) {
        let currentObject = orbitingObjectB;
        let count = 0;
        while (currentObject) {
            count++;
            currentObject = currentObject.orbiting;
            if (currentObject === orbitingObjectA) {
                return count;
            }
        }
        return -1;
    }

    /**
     * @param orbitingObjectA {OrbitingObject}
     * @param orbitingObjectB {OrbitingObject}
     *
     * @return {OrbitingObject}
     */
    findMutualOrbitingObject(orbitingObjectA, orbitingObjectB) {
        let currentObject = orbitingObjectA;
        while (true) {
            currentObject = currentObject.orbiting;
            if (!currentObject) {
                return null;
            }
            if (currentObject.isMutualTo(orbitingObjectB)) {
                return currentObject;
            }
        }
    }


}

module.exports = OrbitBuilder;
