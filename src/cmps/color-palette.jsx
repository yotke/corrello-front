import CheckIcon from '@material-ui/icons/Check';
// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import {MoreHoriz} from '@material-ui/icons';

export function ColorPalette({ handleChange, selectedColor, count }) {

    const colorCodes = [
        '#60bd4f',
        '#f2d600',
        '#ff9e1a',
        '#eb5a46',
        '#c277e0',
        '#0279bf',
        '#52e898',
        '#ff78cb',
        '#334563',
        '#b3bac5',

    ]

    function getStyles() {
        const styles = colorCodes
        return count ? styles.slice(0, count) : styles
    }

    return <div className="color-palette">
        {getStyles().map(colorCode => {
            return <label key={colorCode} className="flex align-center justify-center" style={{ background: colorCode }} name="label-color" htmlFor={`color-${colorCode}`}>
                <input type="radio" name="color" id={`color-${colorCode}`} value={colorCode} onClick={handleChange} />
                {selectedColor === colorCode && <CheckIcon key={colorCode} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}           
        
    </div>
}