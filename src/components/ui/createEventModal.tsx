import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { TCreateEvent, createEventSchema } from "@/lib/types";

type CreateEventModalProps = {
  onClose: () => void;
};

const CreateEventModal = ({ onClose }: CreateEventModalProps) => {
  const form = useForm<TCreateEvent>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      annual: false,
    },
  });

  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const request = await fetch("/api/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const requestedFriends = await request.json();
        const friendNames = requestedFriends.map(
          (friend: { friend_name: string }) => friend.friend_name
        );
        setFriends(friendNames);
      } catch (error) {
        console.log(error);
      }
    };
    loadFriends();
  }, []);
  useEffect(() => {
    console.log(friends);
  }, [friends]);

  const createEvent = async (data: TCreateEvent) => {
    console.log(data);
    try {
      const request = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.errors) {
        console.log(response.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: TCreateEvent) => {
    console.log(form.getValues("annual"));

    // Close the modal
    onClose();

    // Create a new event with the form's information
    createEvent(data);
  };
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center">
      <div
        className="relative px-8 py-4 flex flex-col justify-between items-start lg:w-[62rem] lg:h-[36rem] w-[24rem] h-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h1 className="font-semibold text-3xl">Create Event</h1>
          <img
            src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
            width={40}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={onClose}
          />
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full flex flex-col items-center"
          >
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input className="h-8 w-96" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-96">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="giftee"
              render={({ field }) => (
                <FormItem className="flex flex-col w-96">
                  <FormLabel>Giftees</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? friends.find((friend) => friend === field.value)
                            : "Select Friend"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search for a friend..." />
                        <CommandEmpty>No giftee found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {friends.map((friend) => (
                              <CommandItem
                                value={friend}
                                key={friend}
                                onSelect={() => {
                                  form.setValue("giftee", friend);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    friend === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {friend}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventGifts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Gifts</FormLabel>
                  <FormControl>
                    <Input className="h-8 w-96" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gift Budget</FormLabel>
                  <FormControl>
                    <Input className="h-8 w-96" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annual"
              render={() => (
                <FormItem>
                  <FormLabel>Annual? </FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="annual"
                      render={({ field: { ref, value, onChange } }) => (
                        <Checkbox
                          checked={value}
                          onCheckedChange={(isChecked) => onChange(isChecked)}
                          ref={ref}
                        />
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage>
              {form.formState.errors.annual && (
                <p>{form.formState.errors.annual.message}</p>
              )}
            </FormMessage>
            <button
              type="submit"
              className="p-2 text-secondary-foreground bg-secondary text-2xl self-end"
            >
              Create Event
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateEventModal;
