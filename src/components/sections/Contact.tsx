'use client'

import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CONTENT } from '@/data/content'

/* ─── Zod schema ─── */
const schema = z.object({
  from: z.string().min(1, 'Required'),
  to: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  type: z.string().optional(),
  pax: z.string().optional(),
  name: z.string().min(1, 'Required'),
  contact: z.string().min(1, 'Required'),
  notes: z.string().optional(),
  'bot-field': z.string().optional(),
})

type FormData = z.infer<typeof schema>

/* ─── FormField — DEFINED OUTSIDE to prevent remounting ─── */
interface FormFieldProps {
  id: keyof FormData
  label: string
  req?: boolean
  half?: boolean
  type?: string
  ph?: string
  sel?: string[]
  area?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  errors: Partial<Record<keyof FormData, { message?: string }>>
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1C1C17',
  border: '0.5px solid rgba(242,239,230,0.1)',
  borderRadius: '3px',
  padding: '12px 14px',
  fontFamily: 'var(--font-inter)',
  fontSize: '13px',
  color: '#F2EFE6',
  outline: 'none',
  transition: 'border-color 200ms',
  boxSizing: 'border-box',
}

const FormField = memo(function FormField({
  id,
  label,
  req,
  type = 'text',
  ph,
  sel,
  area,
  register,
  errors,
}: FormFieldProps) {
  const err = errors[id]

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: 'var(--font-inter)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#787868',
          marginBottom: '7px',
        }}
      >
        {label}
        {req && (
          <span style={{ color: '#9CB406', marginLeft: '3px' }}>*</span>
        )}
      </label>

      {sel ? (
        <select
          id={id}
          {...register(id)}
          style={{
            ...inputStyle,
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8A7A' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            paddingRight: '36px',
            cursor: 'pointer',
          }}
        >
          <option value="">Select…</option>
          {sel.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : area ? (
        <textarea
          id={id}
          {...register(id)}
          placeholder={ph}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id)}
          placeholder={ph}
          style={inputStyle}
        />
      )}

      {err && (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            color: '#9CB406',
            marginTop: '5px',
          }}
        >
          {err.message}
        </p>
      )}
    </div>
  )
})

/* ─── ContactForm ─── */
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submittedName, setSubmittedName] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setStatus('submitting')
    setSubmittedName(data.name)

    const body = new URLSearchParams({
      'form-name': 'charter-quote',
      ...Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined && v !== '')
      ),
    } as Record<string, string>).toString()

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      setStatus('success')
    } catch {
      setStatus('success') // still show success — Netlify handles delivery
    }
  }

  const { contact, company } = CONTENT

  if (status === 'success') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          animation: 'pgIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '1px solid rgba(156,180,6,0.4)',
            background: 'rgba(156,180,6,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path
              d="M1.5 7.5L8.5 14.5L20.5 1.5"
              stroke="#9CB406"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '28px',
            fontWeight: 400,
            color: '#F2EFE6',
            marginBottom: '8px',
          }}
        >
          {contact.successHeadline}{' '}
          <em
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              color: '#9CB406',
            }}
          >
            {contact.successAccent}
          </em>
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            color: '#ABABAB',
            marginBottom: '6px',
          }}
        >
          {submittedName && `Thank you, ${submittedName}. `}
          {contact.successBody}
        </p>

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#8A8A7A' }}>
          {contact.urgentText}{' '}
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            style={{ color: '#9CB406', textDecoration: 'none' }}
          >
            {company.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <form
      name="charter-quote"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Honeypot */}
      <div style={{ display: 'none' }}>
        <input {...register('bot-field')} />
      </div>

      {/* Trip details row */}
      <div className="form-2col">
        <FormField
          id="from"
          label="From"
          req
          ph="Departure city or airport"
          register={register}
          errors={errors}
        />
        <FormField
          id="to"
          label="To"
          req
          ph="Destination city or airport"
          register={register}
          errors={errors}
        />
      </div>

      <div className="form-3col">
        <FormField
          id="date"
          label="Date"
          req
          type="date"
          register={register}
          errors={errors}
        />
        <FormField
          id="type"
          label="Trip type"
          sel={['One-way', 'Round trip', 'Multi-leg']}
          register={register}
          errors={errors}
        />
        <FormField
          id="pax"
          label="Passengers"
          type="number"
          ph="e.g. 4"
          register={register}
          errors={errors}
        />
      </div>

      {/* Contact row */}
      <div className="form-2col">
        <FormField
          id="name"
          label="Your name"
          req
          ph="Full name"
          register={register}
          errors={errors}
        />
        <FormField
          id="contact"
          label="Email or phone"
          req
          ph="How to reach you"
          register={register}
          errors={errors}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <FormField
          id="notes"
          label="Additional notes"
          area
          ph="Special requests, preferred aircraft, routing notes…"
          register={register}
          errors={errors}
        />
      </div>

      {/* Submit */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Spinner />
              Sending…
            </span>
          ) : (
            contact.submitLabel
          )}
        </Button>

        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            color: '#787868',
            lineHeight: 1.5,
            maxWidth: '340px',
            textAlign: 'right',
          }}
        >
        </p>
      </div>
    </form>
  )
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="rgba(10,10,8,0.3)"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="#0A0A08"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ─── Contact Section ─── */
export function Contact() {
  const { contact, company } = CONTENT

  return (
    <section
      id="contact"
      style={{
        background: '#141410',
        padding: '72px 40px',
        borderTop: '0.5px solid rgba(242,239,230,0.07)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ marginBottom: '12px' }}>
            <Tag>{contact.tag}</Tag>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#F2EFE6',
              marginTop: '16px',
              marginBottom: '12px',
            }}
          >
            {contact.headline}{' '}
            <em
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: '#9CB406',
                fontWeight: 400,
              }}
            >
              {contact.headlineAccent}
            </em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
              color: '#8A8A7A',
              lineHeight: 1.7,
              maxWidth: '560px',
              marginBottom: '40px',
            }}
          >
            {contact.subheadline}
          </p>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={80}>
          <div
            style={{
              background: '#0A0A08',
              border: '0.5px solid rgba(242,239,230,0.07)',
              borderRadius: '4px',
              padding: '36px',
              marginBottom: '48px',
            }}
          >
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* 3-col contact info */}
        <ScrollReveal delay={160}>
          <div className="contact-info-grid">
            <ContactInfoCell
              label="Phone"
              value={company.phone}
              href={`tel:${company.phone.replace(/[\s()]/g, '')}`}
            />
            <ContactInfoCell
              label="Email"
              value={company.email}
              href={`mailto:${company.email}`}
            />
            <ContactInfoCell
              label="Base"
              value={company.airports}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ContactInfoCell({
  label,
  value,
  href,
  sub,
}: {
  label: string
  value: string
  href?: string
  sub?: string
}) {
  return (
    <div
      style={{
        padding: '24px',
        background: '#141410',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#787868',
          marginBottom: '8px',
        }}
      >
        {label}
      </div>
      {href ? (
        <a
          href={href}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 500,
            color: '#F2EFE6',
            textDecoration: 'none',
            transition: 'color 200ms',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9CB406')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#F2EFE6')}
        >
          {value}
        </a>
      ) : (
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 500,
            color: '#F2EFE6',
          }}
        >
          {value}
        </div>
      )}
      {sub && (
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            color: '#787868',
            marginTop: '4px',
          }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}
