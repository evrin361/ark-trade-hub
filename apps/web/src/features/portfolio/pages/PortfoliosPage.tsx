"use client";

import { useEffect, useState } from "react";
import { AppPage } from "@/components/ui/AppPage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { createListOrganizationsUseCase } from "@/application/organization/list-organizations.use-case";
import { createPortfolioUseCase } from "@/application/portfolio/create-portfolio.use-case";
import { createListPortfoliosUseCase } from "@/application/portfolio/list-portfolios.use-case";
import type { Organization } from "@/features/organization";
import type { Customer } from "@/features/customers";
import type { Portfolio } from "@/features/portfolio";
import { customerService } from "@/features/customers";

export function PortfoliosPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [organizationId, setOrganizationId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [orgResult, customerResult, portfolioResult] =
          await Promise.all([
            createListOrganizationsUseCase().execute(),
            customerService.refresh(),
            createListPortfoliosUseCase().execute(),
          ]);

        if (!active) return;

        if (orgResult.success) setOrganizations(orgResult.data);
        else setError(orgResult.error);

        if (customerResult.success) setCustomers(customerResult.data);
        else setError((current) => current || customerResult.error);

        if (portfolioResult.success) setPortfolios(portfolioResult.data);
        else setError((current) => current || portfolioResult.error);
      } catch {
        if (active) setError("بارگذاری اطلاعات ناموفق بود.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => { active = false; };
  }, []);

  const availableOrganizations = organizations.filter(
    (org) => org.enabled && !org.archived
  );

  const selectedOrganization = availableOrganizations.find(
    (org) => org.id.value === organizationId
  );

  const availableCustomers = customers.filter(
    (customer) =>
      customer.organizationId.value === organizationId &&
      customer.enabled &&
      !customer.archived
  );

  const organizationCustomerIds = new Set(
    customers
      .filter((customer) => customer.organizationId.value === organizationId)
      .map((customer) => customer.id.value)
  );

  const visiblePortfolios = portfolios.filter(
    (portfolio) => organizationCustomerIds.has(portfolio.customerId.value)
  );

  async function createPortfolio() {
    setError("");
    setSuccess("");

    const customer = availableCustomers.find(
      (item) => item.id.value === customerId
    );

    if (!selectedOrganization) {
      setError("ابتدا یک سازمان فعال انتخاب کنید.");
      return;
    }

    if (!customer) {
      setError("یک مشتری فعال از سازمان انتخاب‌شده انتخاب کنید.");
      return;
    }

    if (!name.trim() || !code.trim()) {
      setError("نام و کد پرتفوی الزامی است.");
      return;
    }

    setSaving(true);
    try {
      const result = await createPortfolioUseCase().execute({
        customerId: customer.id,
        name: name.trim(),
        code: code.trim(),
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setPortfolios((current) => [
        ...current.filter((item) => item.id.value !== result.data.id.value),
        result.data,
      ]);
      setName("");
      setCode("");
      setSuccess("پرتفوی با موفقیت ایجاد شد.");
    } catch {
      setError("ایجاد پرتفوی ناموفق بود.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppPage
      title="مدیریت پرتفوی‌ها"
      description="ایجاد و مشاهده پرتفوی‌های مشتریان هر سازمان"
    >
      {loading ? (
        <Card><p role="status">در حال بارگذاری اطلاعات...</p></Card>
      ) : (
        <>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <Card>
            <div className="space-y-4">
              <label htmlFor="portfolio-org" className="block text-sm font-medium">
                سازمان
              </label>
              <select
                id="portfolio-org"
                dir="rtl"
                style={{ colorScheme: "dark" }}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-right text-[var(--text-primary)]"
                value={organizationId}
                onChange={(event) => {
                  setOrganizationId(event.target.value);
                  setCustomerId("");
                  setName("");
                  setCode("");
                  setError("");
                  setSuccess("");
                }}
              >
                <option value="">یک سازمان انتخاب کنید</option>
                {availableOrganizations.map((org) => (
                  <option key={org.id.value} value={org.id.value}>
                    {org.name} ({org.code})
                  </option>
                ))}
              </select>
              {availableOrganizations.length === 0 && (
                <p className="text-sm opacity-70">سازمان فعالی موجود نیست.</p>
              )}
            </div>
          </Card>

          {selectedOrganization && (
            <>
              <Card>
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold">
                    ایجاد پرتفوی برای {selectedOrganization.name}
                  </h2>

                  <div className="space-y-2">
                    <label htmlFor="portfolio-customer" className="block text-sm font-medium">
                      مشتری
                    </label>
                    <select
                      id="portfolio-customer"
                      dir="rtl"
                      style={{ colorScheme: "dark" }}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-right text-[var(--text-primary)]"
                      value={customerId}
                      onChange={(event) => setCustomerId(event.target.value)}
                    >
                      <option value="">یک مشتری انتخاب کنید</option>
                      {availableCustomers.map((customer) => (
                        <option key={customer.id.value} value={customer.id.value}>
                          {customer.firstName} {customer.lastName} ({customer.code})
                        </option>
                      ))}
                    </select>
                    {availableCustomers.length === 0 && (
                      <p className="text-sm opacity-70">
                        این سازمان مشتری فعال ندارد.
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="نام پرتفوی" required>
                      <Input value={name} onChange={(event) => setName(event.target.value)} />
                    </FormField>
                    <FormField label="کد پرتفوی" required>
                      <Input value={code} onChange={(event) => setCode(event.target.value)} />
                    </FormField>
                  </div>

                  {success && <p role="status" className="text-sm text-green-600">{success}</p>}

                  <div className="flex justify-end">
                    <Button
                      disabled={saving || !customerId || !name.trim() || !code.trim()}
                      onClick={createPortfolio}
                    >
                      {saving ? "در حال ذخیره..." : "ایجاد پرتفوی"}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="mb-4 text-lg font-semibold">
                  پرتفوی‌های {selectedOrganization.name}
                </h2>
                {visiblePortfolios.length === 0 ? (
                  <p className="text-sm opacity-70">
                    هنوز پرتفویی برای مشتریان این سازمان ثبت نشده است.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {visiblePortfolios.map((portfolio) => {
                      const owner = customers.find(
                        (item) => item.id.value === portfolio.customerId.value
                      );
                      return (
                        <div key={portfolio.id.value} className="rounded-lg border border-[var(--border)] p-4">
                          <h3 className="font-semibold">{portfolio.name}</h3>
                          <p className="mt-1 text-sm opacity-70">کد: {portfolio.code}</p>
                          <p className="mt-1 text-sm opacity-70">
                            مشتری: {owner ? `${owner.firstName} ${owner.lastName}` : "نامشخص"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </>
          )}

          {!selectedOrganization && (
            <Card>
              <p className="text-sm opacity-70">
                برای مشاهده یا ایجاد پرتفوی، ابتدا یک سازمان انتخاب کنید.
              </p>
            </Card>
          )}
        </>
      )}
    </AppPage>
  );
}
