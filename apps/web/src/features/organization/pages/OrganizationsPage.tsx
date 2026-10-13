"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AppPage } from "@/components/ui/AppPage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createOrganizationUseCase } from "@/application/organization/create-organization.use-case";
import { createListOrganizationsUseCase } from "@/application/organization/list-organizations.use-case";
import type { Organization } from "../types/organization";

export function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function loadInitialOrganizations() {
      try {
        const result = await createListOrganizationsUseCase().execute();
        if (!active) return;

        if (result.success) {
          setOrganizations(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        if (active) {
          setError("بارگیری سازمان‌ها انجام نشد. لطفاً دوباره تلاش کنید.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadInitialOrganizations();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const normalizedName = name.trim();
    const normalizedCode = code.trim();

    if (!normalizedName || !normalizedCode) {
      setError("نام و کد سازمان را وارد کنید.");
      return;
    }

    setSaving(true);

    try {
      const result = await createOrganizationUseCase().execute({
        name: normalizedName,
        code: normalizedCode,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setOrganizations((current) => [
        ...current.filter(
          (organization) => organization.id.value !== result.data.id.value
        ),
        result.data,
      ]);
      setName("");
      setCode("");
      setNotice("سازمان با موفقیت ایجاد شد.");
    } catch {
      setError("ایجاد سازمان انجام نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppPage
      title="سازمان‌ها"
      description="سازمان‌های مورد استفاده در مدیریت مشتریان را ایجاد و مدیریت کنید."
    >
      <div className="space-y-6">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold">ایجاد سازمان</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-sm font-medium">نام سازمان</span>
                <input
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={120}
                  required
                  disabled={saving}
                  placeholder="نام سازمان"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium">کد سازمان</span>
                <input
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  maxLength={50}
                  required
                  disabled={saving}
                  placeholder="کد سازمان"
                />
              </label>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {notice && (
              <p role="status" className="text-sm text-green-700">
                {notice}
              </p>
            )}

          <div dir="ltr" className="flex justify-start">
            <Button type="submit" disabled={saving}>
              {saving ? "در حال ایجاد…" : "ایجاد سازمان"}
            </Button>
          </div>
          </form>
        </Card>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">فهرست سازمان‌ها</h2>

          {loading ? (
            <p role="status">در حال بارگیری سازمان‌ها…</p>
          ) : organizations.length === 0 ? (
            <Card>
              <p>هنوز سازمانی ایجاد نشده است.</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {organizations.map((organization) => (
                <Card key={organization.id.value}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{organization.name}</h3>
                      <p className="text-sm opacity-70">
                        کد سازمان: {organization.code}
                      </p>
                    </div>
                    <span className="text-xs opacity-60">
                      شناسه: {organization.id.value}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppPage>
  );
}
