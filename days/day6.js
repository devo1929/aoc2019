const fileUtils = require('../utils/file-utils');
const OrbitBuilder = require('../classes/orbit-builder');

const orbits = fileUtils.readInputLines('day6.txt');

const orbitBuilder = new OrbitBuilder(orbits);
const root = orbitBuilder.build();

partOne();
partTwo();


function partOne() {
    const orbitCount = orbitBuilder.countOrbits(root);
    console.log('part 1', orbitCount);
}

function partTwo() {
    const orbitalTransferCount = orbitBuilder.getOrbitalTransferCount();
    console.log('part 2', orbitalTransferCount);
}
