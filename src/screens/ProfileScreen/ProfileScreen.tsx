import React, {useContext} from 'react';
import {AuthContext} from '../../context/Auth';
import {UserEvents} from '../../components/UserEvents';
import {ProfileHeaderCard} from '../../components/ProfileHeaderCard';

export const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <ProfileHeaderCard name={user.name} photoUrl={user.photoUrl} />
  );
}
