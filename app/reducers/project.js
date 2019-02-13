import type { Action, Project } from './types';
import actions from '../constants/actions';

const defaultState: Project = {
    folder: '',
    domains: []
};

const project = (state = defaultState, action: Action) => {
    if (action.type === actions.project.SET_FOLDER) {
        // Read options folder.
        return {
            ...state,
            folder: action.data.folder
        };
    }
    return state;
};

function getProjectDomains(folder: string): string[] {
    
}


export default project;
