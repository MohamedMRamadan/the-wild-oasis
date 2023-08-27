import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const [
    isLoading,
    {
      minBookingLength,
      maxGuestsPerBooking,
      maxBookingLength,
      breakfastPrice,
    } = {},
  ] = useSettings();

  const [isUpdating, updateSetting] = useUpdateSettings();

  const updateSettingsHandler = (e) => {
    const { value, name } = e.target;
    if (!value) return;
    updateSetting({ [name]: value });
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={updateSettingsHandler}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          name="breakfastPrice"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
