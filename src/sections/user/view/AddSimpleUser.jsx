'use client';

import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addUser, fetchAllUser } from 'src/Actions/PdtActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const states = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];
const stats = [
    { value: 'Banned', label: 'Banned' },
    { value: 'Active', label: 'Active' },
  ];
const regions = [
  { value: 'America', label: 'America' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Africa', label: 'Africa' },
];
const roles = [
  { value: 'user', label: 'user' },
  { value: 'admin', label: 'admin' },
];

export default function AddSimpleUser() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [company, setCompany] = useState('');
    const [verified, setVerified] = useState(0);
    const [status, setStatus] = useState(0);
    const [role, setRole] = useState('user');
    const [region, setRegion] = useState('');

    const dispatch = useDispatch();

    const tokenFromCookie = localStorage.getItem('token');

    const fetchUpdatedUserData = async () => {
        try {
          await dispatch(fetchAllUser(tokenFromCookie));
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des données utilisateur actualisées :", error);
        }
      };


      
  const handleSaveDetails = async () => {
    try {
      await dispatch(addUser(username, role, company, status, verified, region, tokenFromCookie));
      

      fetchUpdatedUserData();
      toast.success('User added!');
    } catch (error) {
      toast.error("Add failed :", error);
    }
  };

  return (
<>
<ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >


      <Card>
        <CardHeader subheader="The information can be edited" title="New user" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel> UserName</InputLabel>
                <OutlinedInput value={username} label="UserName" name="UserName" onChange={(e) => setUsername(e.target.value)}/>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select value={role} label="role" name="role" variant="outlined" onChange={(e) => setRole(e.target.value)}>
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <OutlinedInput value={company} label="Company" name="Company" onChange={(e) => setCompany(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={status === 0 ? 'Banned' : 'Active'} label="Status" name="Status" variant="outlined" onChange={(e) => setStatus(e.target.value === 'Active' ? 1 : 0)}>
                  {stats.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Verified?</InputLabel>
                <Select value={verified === 0 ? 'No' : 'Yes'} label="Verified" name="Verified" variant="outlined" onChange={(e) => setVerified(e.target.value === 'Yes' ? 1 : 0)}>
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select value={region} label="Region" name="Region" variant="outlined" onChange={(e) => setRegion(e.target.value)}>
                  {regions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSaveDetails} disabled={username === ''}>Save</Button>
        <Button variant="outlined" onClick={() => navigate('/user') }>Retour</Button>
          </CardActions>
      </Card>
    </form>
    </>
  );
}

