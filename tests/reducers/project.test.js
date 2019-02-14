import { getProjectDomains } from '../../app/reducers/project';

test('get project domains from folder', () => {
    const project = 'C:\\Users\\Adam\\Documents\\programming\\reports';
    const domains = getProjectDomains(project);

    expect(domains.length).toBeGreaterThan(0);
    domains.forEach(domain => {
       expect(domain.indexOf('.json')).toBeLessThan(0);
       expect(domain.indexOf('_')).toBeLessThan(0);
    });
});
