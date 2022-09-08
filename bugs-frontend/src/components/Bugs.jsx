import React,{ Component } from 'react';
import { connect } from 'react-redux';
import StoreContext from '../contexts/storeContext';
import {loadBugs, resolveBug} from '../store/bugs'
import {getUnresolvedBugs} from '../store/bugs';

class Bugs extends Component{

    componentDidMount(){
        this.props.loadBugs();
    }

    
    render(){
        // return <div>Bugs</div>;
        return(
            <ul>
                {this.props.bugs.map((bug) => (
                    <li key = {bug.id}> {bug.description}
                    <button onClick={()=>this.props.resolveBug(bug.id)}>resolve</button> 
                    </li>
                ))}
            </ul>
            
        );
    }
}

const mapStateToProps = state => ({
    bugs: getUnresolvedBugs(state),
})

const mapDispatchToProps = dispatch => ({
    loadBugs:()=> dispatch(loadBugs()),
    resolveBug: id => dispatch(resolveBug(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Bugs)
