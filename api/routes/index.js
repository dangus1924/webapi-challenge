const actionsRoutes = require('./actions/actionsRouter')
const projectsRoutes = require('./projects/projectsRouter')

module.exports = server => {
    server.use('/api/actions', actionsRoutes);
    server.use('/api/projects', projectsRoutes)
};