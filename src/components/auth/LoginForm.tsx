"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import {
  authenticateUser,
  findShipmentByTrack,
  getDemoCredentials,
} from "@/lib/services/portal";
import { saveSession } from "@/lib/auth/session";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = searchParams.get("track");
  const demo = useMemo(() => getDemoCredentials(), []);

  const [email, setEmail] = useState(demo.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await authenticateUser(email, password);
      if (!user) {
        setError(
          "Email or password is incorrect. Confirm your account credentials and try again.",
        );
        return;
      }
      saveSession(user);

      if (track?.trim()) {
        const match = await findShipmentByTrack(track);
        if (match) {
          router.push(`/portal/shipments/${match.id}`);
        } else {
          router.push(`/portal/shipments?q=${encodeURIComponent(track.trim())}`);
        }
      } else {
        router.push("/portal");
      }
    } catch {
      setError("Sign-in could not be completed. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {track ? (
        <div className="border border-steel/40 bg-steel/10 px-3 py-2.5 text-[13px] text-fog">
          Sign in to view status for{" "}
          <span className="mono-ref text-snow">{track}</span>.
        </div>
      ) : null}

      <TextInput
        id="email"
        label="Email"
        type="email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hint={`Demo password: ${demo.password}`}
      />

      {error ? (
        <div
          role="alert"
          className="border border-status-exception/30 bg-status-exception/[0.06] px-3 py-2.5 text-[13px] text-status-exception"
        >
          {error}
        </div>
      ) : null}

      <Button type="submit" className="w-full" size="md" disabled={loading}>
        {loading ? "Checking credentials…" : "Sign in"}
      </Button>

      <p className="text-center text-xs text-mist">
        Portal access is issued with your ITC Group account setup.
      </p>
    </form>
  );
}
