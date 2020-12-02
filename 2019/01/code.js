const { run } = require('../../utils');

const part1 = parsedInput => {
    return parsedInput.reduce((prev, curr) => prev + Math.floor(curr / 3) - 2, 0);
};

// not total fuel for all modules combined + additionally required fuel, but fuel for each separate module with it's additional required fuel
// check part3
const part2 = parsedInput => {
    let fuel = part1(parsedInput);
    const modules = [];

    while (fuel > 0) {
        modules.push(fuel);
        fuel = part1([modules[modules.length - 1]]);
    }
    console.log(modules);

    return modules.slice(0, -1).reduce((prev, curr) => prev + curr, 0);
};


const fuelForModulesWithAdditionalFuel = fuelForModulesOnly => {
    const fuelForModulesAtTheBeginning = fuelForModulesOnly;
    let arrayOfAdditionalFuel = [fuelForModulesAtTheBeginning];
    while (fuelForModulesOnly > 0) {
        let fuel = (Math.floor(fuelForModulesOnly / 3)) - 2;
        arrayOfAdditionalFuel.push(fuel);
        fuelForModulesOnly = fuel;
    }

    return arrayOfAdditionalFuel.slice(0, -1).reduce((a, b) => a + b);
}

const fuelForModules = prepareInputModulesMass => fuelForEachModule(prepareInputModulesMass).reduce((a, b) => a + b, 0);
const fuelForEachModule = arr => arr.map(el => Math.floor(el / 3) - 2);

const part3 = prepareInputModulesMass => {
    // part 1
    console.log('part 1: ', fuelForModules(prepareInputModulesMass));

    console.log('part 2: ', fuelForEachModule(prepareInputModulesMass).map(fuelForModulesWithAdditionalFuel).reduce((a, b) => a + b, 0));
}

run({ part1, part2, part3 });
