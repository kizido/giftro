"use client";
import { useState } from "react";
import { Button } from "./button";
import CreateEventModal from "./createEventModal";

const CreateEventButton = () => {
  const [showCreateEventButton, setShowCreateEventButton] = useState(false);

  return (
    <>
      <Button onClick={() => setShowCreateEventButton(true)}>
        Create Event
      </Button>
      {showCreateEventButton && (
        <CreateEventModal onClose={() => setShowCreateEventButton(false)} />
      )}
    </>
  );
};

export default CreateEventButton;
