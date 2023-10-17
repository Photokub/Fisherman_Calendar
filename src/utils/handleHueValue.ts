//вычисление Hue
export function handleHueValue(moon: number, press: number) {
    if (moon < press || press > 120) {
        return moon
    } else {
        return moon + press
    }
}