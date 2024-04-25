import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export function UserInfo({userId}) {
    const userDetails = useSelector(state => state.auth.user || []);

  const userDetail = userDetails.find(user => user.id === userId);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} alignItems='center'>
          <div>
            <Avatar src={userDetail.photo} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} textAlign='center'>
            <Typography variant='h5'>{userDetail.username}</Typography>
            <Typography color='text.secondary' variant='body2'>
              {userDetail.role}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
UserInfo.propTypes = {
    userId: PropTypes.any,
  };

