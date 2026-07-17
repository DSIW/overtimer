import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TimeLog from "../domain/TimeLog";
import { useSnackbar } from "notistack";
import {
  isPersisted,
  requestPersistence,
} from "../infrastructure/PersistencePermission";
import Alert from "./ui/Alert";

interface Props {
  timeLogs: TimeLog[];
}

const WARNING_MESSAGE =
  "Time logs can be deleted in the future. Make backups on a regular basis e.g. every day.";

export default function PersistenceWarning({ timeLogs }: Props) {
  const [persisted, setPersisted] = useState<boolean | undefined>();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetch() {
      setPersisted(await isPersisted());
    }

    fetch();
  }, [timeLogs]);

  async function handleTrial() {
    const isPersisted = await requestPersistence();
    if (!isPersisted) {
      enqueueSnackbar("Still no permission! Please go to your site settings.", {
        variant: "error",
      });
    }
  }

  if (timeLogs.length <= 0 || persisted) {
    return null;
  }

  return (
    <div className="mb-8 w-full">
      <Alert
        severity="warning"
        title="Persistence not allowed!"
        action={
          <button
            type="button"
            onClick={handleTrial}
            className="rounded-md px-2 py-1 text-sm font-medium hover:bg-warning/10"
          >
            TRY AGAIN
          </button>
        }
      >
        {WARNING_MESSAGE}
      </Alert>
    </div>
  );
}
