// intiallizatino
const express = require('express');
const cors = require('cors');

const inhabitantsRoutes = require('./routes/inhabitants');
const householdRoutes = require('./routes/household');
const hoseholdMembersRoutes = require('./routes/householdMembers');
const KKMembersRoutes = require('./routes/KKMembers');
const seniorCitizenRoutes = require('./routes/seniorCitizen');
const dashboardRoutes = require('./routes/dashboard');
const announcementsRoutes = require('./routes/Announcements');
const ordinancesRoutes = require('./routes/ordinances');
const personel1Routes = require('./routes/personel1');
const personel2Routes = require('./routes/personel2');
const personel3Routes = require('./routes/personel3');
const personel4Routes = require('./routes/personel4');
const personel5Routes = require('./routes/personel5');
const luponRecordRoutes = require('./routes/luponRecords');
const chartFetcherRoutes = require('./routes/chartFetcher');
const loginRoutes = require('./routes/login');
const demographic = require('./routes/demographic');
const HomeDashboard = require('./routes/HomeDashboardData')
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'], 
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/demographic',demographic);
app.use('/api/login',loginRoutes);
app.use('/api/chart',chartFetcherRoutes);
app.use('/api/lupon',luponRecordRoutes);
app.use('/api/personel5', personel5Routes);
app.use('/api/personel4', personel4Routes);
app.use('/api/personel3', personel3Routes);
app.use('/api/personel2', personel2Routes);
app.use('/api/personel1',personel1Routes);
app.use('/api/ordinances',ordinancesRoutes);
app.use('/api/Announcements', announcementsRoutes);
app.use('/api/inhabitants', inhabitantsRoutes);
app.use('/api/household', householdRoutes);
app.use('/api/householdMembers', hoseholdMembersRoutes);
app.use('/api/KKMembers', KKMembersRoutes);
app.use('/api/seniorCitizen', seniorCitizenRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/homeDashboard', HomeDashboard);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
