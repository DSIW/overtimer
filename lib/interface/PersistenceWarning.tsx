import { Button } from '@material-ui/core';
import { AlertTitle } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TimeLog from '../domain/TimeLog';

interface Props {
  timeLogs: TimeLog[];
}

const WARNING_MESSAGE = "Time logs can be deleted in the future. Make backups on a regular basis e.g. every day."

export default function PersistenceWarning({ timeLogs }: Props) {
  const [persisted, setPersisted] = useState<boolean | undefined>();

  useEffect(() => {
    async function fetch() {
      const persisted = await navigator.storage.persisted();
      setPersisted(persisted);
    }

    fetch();
  }, [timeLogs]);

  async function requestPermission() {
    if (navigator.storage && navigator.storage.persist) {
      await navigator.storage.persist();
    }
  }

  if (timeLogs.length <= 0 || persisted) {
    return null;
  }

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <Alert severity="warning" action={
        <Button color="inherit" size="small" onClick={requestPermission}>
          REQUEST
        </Button>
      }>
        <AlertTitle>Persistence not allowed!</AlertTitle>
        {WARNING_MESSAGE}
        </Alert>
    </div>
  );
}
