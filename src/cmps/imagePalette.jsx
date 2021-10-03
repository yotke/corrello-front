import CheckIcon from '@material-ui/icons/Check';
// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

export function ImagePalette({ handleChange, selectedColor, count }) {

    const urls = [
   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/366b2643e789735182636ab3af05243c/photo-1575351881847-b3bf188d9d0a.jpg',
   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/cc16313af10dd43c6fa5132e380f43d0/photo-1629199022827-eede3c3df471.jpg',
   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1283x1920/5442c84e9d91238aeb465e80974294ff/photo-1536293182766-c9c0c4133b55.jpg',
   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x1920/43d6569d8effa6131b09458d898fc234/photo-1629648530797-ea135d60d534.jpg',
   'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1472x1920/60ebd80dbbc858dcbbff83b586099ce5/photo-1630691432568-b202e42643e2.jpg',
   'https://images.unsplash.com/photo-1503437313881-503a91226402?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80'
    ]
    

    function getStyles() {
        const styles = urls
        return count ? styles.slice(0, count) : styles
    }

    return <div className="color-palette">
        {getStyles().map(imageUrl => {
            return <label key={imageUrl} className="flex align-center justify-center" style={{
              backgroundImage:"url(" + imageUrl + ")",
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
          }} name="label-color" htmlFor={`color-${imageUrl}`}>
                <input type="radio" name="color" id={`color-${imageUrl}`} value={imageUrl} onClick={handleChange} />
                {selectedColor === imageUrl && <CheckIcon key={imageUrl} style={{ width: '16px', height: '16px', color: 'white' }} />}
            </label>
        })}
    </div>
}