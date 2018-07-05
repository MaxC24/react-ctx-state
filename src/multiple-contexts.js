//pass an array of contexts:
export function mP(arr, Component) {
    return arr.reduce((Comp, next) => {
        return next.provider(Comp)
    }, Component)
} 

export function mC(arr, Component) {
    return arr.reduce((Comp, next) => {
        return next.consumer(Comp)
    }, Component)
}