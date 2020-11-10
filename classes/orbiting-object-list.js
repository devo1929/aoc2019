/**
 * @property orbitingObjects {OrbitingObject[]}
 */
class OrbitingObjectList {

    /**
     * @param input {string[]}
     */
    constructor(input) {
        this.orbitingObjects = input
            .reduce((objects, _orbit) => {
                return objects;
            }, []);
    }
}
