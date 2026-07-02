import { getSettings } from "@/lib/data/admin";
import { updateSettings } from "@/app/admin/(dashboard)/actions";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <p className="eyebrow mb-3">Configure</p>
      <h1 className="font-display text-3xl mb-10">Settings</h1>

      {!settings ? (
        <p className="text-sm text-graphite">
          No settings row found. Run the SQL schema's seed insert, or create
          one manually in the Supabase table editor.
        </p>
      ) : (
        <form action={updateSettings} className="flex flex-col gap-6 max-w-md">
          <input type="hidden" name="id" value={settings.id} />

          <div>
            <label className="eyebrow mb-2 block">Store Name</label>
            <input
              name="store_name"
              required
              defaultValue={settings.store_name}
              className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="eyebrow mb-2 block">Notification Email</label>
            <input
              name="notification_email"
              type="email"
              required
              defaultValue={settings.notification_email}
              className="w-full bg-transparent border border-silver/50 px-4 py-3.5 text-sm focus:outline-none focus:border-ink"
            />
            <p className="text-xs text-graphite mt-2">
              Every new order sends a "New Order - Urban Vogue" email to this
              address.
            </p>
          </div>

          <button type="submit" className="btn-primary self-start">
            Save Settings
          </button>
        </form>
      )}
    </div>
  );
}
