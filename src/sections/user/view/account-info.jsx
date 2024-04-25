import React from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export function AccountInfo() {
  const tokenFromCookie = localStorage.getItem('token');

  const user = jwtDecode(tokenFromCookie);

  let accountDetail = useSelector(state => state.auth.user || []);

  if (Array.isArray(accountDetail)) {
    accountDetail = accountDetail.find(u => u.id === parseInt(user.userId,10));
 }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems='center'>
          <div>
            <Avatar src={accountDetail.photo} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} textAlign='center'>
            <Typography variant='h5'>{accountDetail.username}</Typography>
            <Typography color='text.secondary' variant='body2'>
              {accountDetail.role}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant='text'>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
