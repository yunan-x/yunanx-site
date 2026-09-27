'use client'

import { useState } from 'react'
import type { Contact } from '@/payload-types'

export function ContactForm({ contact, headingLevel = 'h1' }: { contact: Contact; headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'fail'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } })
      setState(res.ok ? 'done' : 'fail')
    } catch {
      setState('fail')
    }
  }

  return (
    <section id="contact" className="sec_hero">
      <div className="w-layout-blockcontainer contain w-container">
        <div className="wrap">
          <div className="w-layout-vflex aligne_center_center">
            <div className="w-layout-vflex form_wrap">
              <Heading className={headingLevel === 'h2' ? 'h1' : undefined}>{contact.heading}</Heading>
              {contact.subheading && <p>{contact.subheading}</p>}
              <div className="form-block w-form">
                {state !== 'done' && (
                  <form className="form" onSubmit={onSubmit}>
                    <label htmlFor="Name" className="sr-only">Name</label>
                    <input className="contact_form_txt w-input" maxLength={256} name="Name" placeholder="Name" type="text" id="Name" required />
                    <label htmlFor="Email" className="sr-only">Email</label>
                    <input className="contact_form_txt w-input" maxLength={256} name="Email" placeholder="Email" type="email" id="Email" required />
                    <label htmlFor="Message" className="sr-only">Message</label>
                    <input className="contact_form_txt w-input" maxLength={256} name="Message" placeholder="Drop me a message" type="text" id="Message" required />
                    <input type="submit" className="button w-button" value={state === 'sending' ? 'Please wait...' : 'Submit'} disabled={state === 'sending'} />
                  </form>
                )}
                {state === 'done' && (
                  <div className="success-message w-form-done" style={{ display: 'block' }} role="status">
                    <div>{contact.successMessage}</div>
                  </div>
                )}
                {state === 'fail' && (
                  <div className="w-form-fail" style={{ display: 'block' }} role="alert">
                    <div>{contact.errorMessage}</div>
                  </div>
                )}
              </div>
              <img src="/assets/6924abf1e391624479f3243c/69470cf1a6bca65e5d7d1042_dog.svg" loading="lazy" alt="" className="img_dog" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
