import { useState, useEffect} from 'react'
import './App.css'

function App() {

  return (
        <div className="container d-flex justify-content-center">
            <Board row_length={9} col_length={9} count={50}/>
        </div>
  );
}

function Board({ row_length, col_length, count}) {

    const isValid = (board, i, j, num) => {
        //check for col
        for(let n = 0; n < row_length; n++) {
            if(board[i][n] === num) {
                return false
            }
        }
        //check for row
        for(let n = 0; n < row_length; n++) {
            if(board[n][j] === num) {
                return false
            }
        }
        
        return true
    }

    const gennerate_values = () => {

        const result = Array(row_length).fill().map( () => Array(col_length).fill(0))

        for(let _ = 0; _ < count; _++) {
            let i = Math.floor(Math.random()*9);
            let j = Math.floor(Math.random()*9);
            let num = Math.floor(Math.random()*9);

            if(isValid(result, i, j, num)) {
                result[i][j] = num
            }
        }

        return result
    }

    const [values, setValues] = useState(gennerate_values());

    const onChange = (e, i, j) => {
        let num = parseInt(e.target.value)

        console.log(valuse_clone)

        if(isValid(values, i, j, num)) {
            const newValues = values.slice()
            newValues[i][j] = num
            setValues(newValues)
        } else {
            console.log("you can not enter value here")
        }
    }

    const render = () => {
        let rows = []
        for(let i = 0; i < row_length; i++ ) {
            for(let j = 0; j < col_length; j++) {
                rows.push(<div className="" key={ i*row_length + j} ><Square fixed={ valuse[i][j] !== 0 } value={ values[i][j] } onChange={ (e) => onChange(e, i, j)}/></div>)
            }
        }

        return rows;
    }

    return (
        <div className="board">
            { render() }
        </div>
    )
}

function Square({ fixed, value, onChange}) {

    if( fixed ) {
        return <input type="text" value={ value } disabled className="form-control square text-center"></input>
    } else {
        return <input type="text" maxLength={1} value=""  className="form-control square text-center" onChange={ (e) => {
            if(isNaN(parseInt(e.target.value)) && e.target.value !== "") {
                console.log("can't enter value")
            } else {
                onChange(e);
            }
        }}></input>
    }    
}

export default App
