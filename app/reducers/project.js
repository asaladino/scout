import fs from 'fs';
import path from 'path';
import type { Action, Project } from './types';
import actions from '../constants/actions';

const defaultState: Project = {
    folder: '',
    domains: [],
    domain: ''
};

const project = (state = defaultState, action: Action) => {
    if (action.type === actions.project.SET_FOLDER) {
        const { folder } = action.data;
        const domains = getProjectDomains(folder);
        const domain = domains.length > 0 ? domains[0] : '';
        return { ...state, folder, domains, domain };
    }
    if (action.type === actions.project.SET_DOMAIN) {
        const { domain } = action.data;
        return { ...state, domain };
    }
    return state;
};

const getProjectDomains = (folder: string) => {
    const options = path.join(folder, 'options');
    const files = fs.readdirSync(options);
    return files.map(file => file.replace('.json', '').replace(/[_]/g, '.'));
};

export default project;

export { getProjectDomains };
