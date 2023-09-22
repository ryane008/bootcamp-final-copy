import LoadingBar from "./LoadingBar";

interface Props {
    score: number;
    loadTime: number;
    updateCount: Function;
  }

function ClickyBox({score, loadTime, updateCount}:Props){
    updateCount(score);
    return (<div style={{ border: '1px solid #ccc', padding: '20px', display: 'inline-block' }}>
        <h2>+{score}</h2>
        <LoadingBar duration={loadTime}/>
    </div>
    );
}

export default ClickyBox;