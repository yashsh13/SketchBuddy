import InputField from "@repo/ui/components/InputField";
import MailIcon from "@repo/ui/icons/Mail-Icon";
import UserIcon from "@repo/ui/icons/UserIcon";
import KeyIcon from "@repo/ui/icons/KeyIcon";

export default function Home() {
  return (
    <div className="w-xs p-5">
      <InputField placeholder="Username" icon={<MailIcon />}/>
      <InputField placeholder="Username" icon={<UserIcon />}/>
      <InputField placeholder="Username" icon={<KeyIcon />}/>
      <InputField placeholder="Username" />
    </div>
  );
}
