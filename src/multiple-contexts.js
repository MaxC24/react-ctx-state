//pass an array of contexts:
export function mP(arr, Component) {
    console.log('hey')
    let newComp;
    arr.forEach(ctx => {
        newComp = ctx.provider(Component)
        Component = newComp
    })
    return newComp
} 

export function mC(arr, Component) {
    let newComp;
    arr.forEach(ctx => {
        newComp = ctx.consumer(Component)
        Component = newComp
    })
    return newComp
}