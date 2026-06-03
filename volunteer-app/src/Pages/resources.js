import React, { useMemo, useState } from 'react';
import './resources.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import NavBarAdmin from './navBarAdmin';

const resourceGroups = [
  {
    id: 'general',
    label: 'General',
    summary: 'Orientation, policies, and the core intern handbook.',
    items: [
      {
        id: 'about-steme',
        label: 'About STEM-E',
        title: 'About STEM-E',
        eyebrow: 'General',
        description: 'A concise intro to the STEM-E program, how the team is structured, and where interns fit in.',
        preview: 'Use this area for onboarding videos, flowcharts, and quick-start docs.',
        bullets: ['Program overview', 'Volunteer roles', 'Day-one expectations'],
        links: ['Handbook', 'Welcome deck', 'Org chart'],
      },
      {
        id: 'mission-vision',
        label: 'Mission and Vision',
        title: 'Mission and Vision',
        eyebrow: 'General',
        description: 'The values and long-term goals that guide the internship experience and team decisions.',
        preview: 'Keep the main statement, short summary, and a linked reference doc here.',
        bullets: ['Mission statement', 'Vision summary', 'Team principles'],
        links: ['Mission doc', 'Vision board'],
      },
      {
        id: 'values',
        label: 'Values',
        title: 'Values',
        eyebrow: 'General',
        description: 'What the team expects from interns and what interns can expect from the program.',
        preview: 'This space works well for an infographic or a one-page policy sheet.',
        bullets: ['Communication', 'Reliability', 'Growth mindset'],
        links: ['Values sheet'],
      },
      {
        id: 'pvsa',
        label: 'PVSA',
        title: 'PVSA',
        eyebrow: 'General',
        description: 'Volunteer Service Award details, tracking expectations, and submission reminders.',
        preview: 'Link the award requirements and a sample tracking guide here.',
        bullets: ['Eligibility', 'Hour totals', 'Submission windows'],
        links: ['PVSA guide', 'Award tracker'],
      },
      {
        id: 'benefits',
        label: 'Internship Benefits',
        title: 'Internship Benefits',
        eyebrow: 'General',
        description: 'A quick view of the skills, experience, and opportunities interns gain from the program.',
        preview: 'This is a good place for testimonials or a visual benefits recap.',
        bullets: ['Portfolio growth', 'Mentorship', 'Community impact'],
        links: ['Benefits one-pager'],
      },
      {
        id: 'roles',
        label: 'Internship Roles',
        title: 'Internship Roles',
        eyebrow: 'General',
        description: 'A breakdown of the roles interns can take on and how responsibilities are distributed.',
        preview: 'Use this section to compare roles side by side.',
        bullets: ['Role expectations', 'Team ownership', 'Cross-functional work'],
        links: ['Role matrix'],
      },
      {
        id: 'requirements',
        label: 'Internship Requirements',
        title: 'Internship Requirements',
        eyebrow: 'General',
        description: 'The minimum expectations for attendance, communication, and participation.',
        preview: 'A checklist or policy card fits well here.',
        bullets: ['Attendance', 'Communication', 'Deliverables'],
        links: ['Requirements checklist'],
      },
      {
        id: 'team-meetings',
        label: 'Team Meetings',
        title: 'Team Meetings',
        eyebrow: 'General',
        description: 'Meeting cadence, agendas, and how interns should prepare before joining a session.',
        preview: 'Add recurring meeting links, agenda templates, and recaps here.',
        bullets: ['Weekly cadence', 'Agenda prep', 'Meeting notes'],
        links: ['Meeting agenda', 'Notes archive'],
      },
      {
        id: 'switching-roles',
        label: 'Switching Roles',
        title: 'Switching Roles',
        eyebrow: 'General',
        description: 'How to request a role change and what to include in the request.',
        preview: 'A short process diagram works well in this panel.',
        bullets: ['Request form', 'Approval flow', 'Timeline'],
        links: ['Role change form'],
      },
      {
        id: 'whenisgood',
        label: 'Whenisgood?',
        title: 'Whenisgood?',
        eyebrow: 'General',
        description: 'The scheduling tool used to coordinate meetings and collect availability.',
        preview: 'Embed the calendar or a scheduling walkthrough here.',
        bullets: ['Availability check', 'Meeting polls', 'Scheduling reminders'],
        links: ['Scheduling guide'],
      },
      {
        id: 'letters-certificates',
        label: 'Letters and Certificates',
        title: 'Letters and Certificates',
        eyebrow: 'General',
        description: 'Reference material for request letters, completion certificates, and related approvals.',
        preview: 'Provide templates and examples for interns to download.',
        bullets: ['Completion letters', 'Certificate requests', 'Approval routing'],
        links: ['Template folder'],
      },
      {
        id: 'logging-hours',
        label: 'Logging Hours',
        title: 'Logging Hours',
        eyebrow: 'General',
        description: 'How to track volunteer time accurately and where to submit hours.',
        preview: 'A short video walkthrough or embedded sheet fits best here.',
        bullets: ['Log weekly', 'Use the shared sheet', 'Keep evidence handy'],
        links: ['Time sheet', 'How-to guide'],
      },
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    summary: 'Tools, app work, and technical onboarding resources.',
    items: [
      {
        id: 'volunteer-app',
        label: 'Volunteer App',
        title: 'Volunteer App',
        eyebrow: 'Programming',
        description: 'Guides for the volunteer app, feature ownership, and how to test updates safely.',
        preview: 'Use this spot for architecture notes, screenshots, and release walkthroughs.',
        bullets: ['Local setup', 'Feature map', 'Testing checklist'],
        links: ['Code guide', 'Release notes'],
      },
      {
        id: 'member-app',
        label: 'Member App',
        title: 'Member App',
        eyebrow: 'Programming',
        description: 'Onboarding notes and workflows for the member-facing application.',
        preview: 'Add screenshots, component maps, or a short product tour.',
        bullets: ['Navigation', 'Forms', 'Permissions'],
        links: ['Member app brief'],
      },
      {
        id: 'map-app',
        label: 'Map App',
        title: 'Map App',
        eyebrow: 'Programming',
        description: 'How location-based features work and what interns need to know before editing them.',
        preview: 'A flowchart or API reference can live here.',
        bullets: ['Map layers', 'Pins', 'Filters'],
        links: ['Map docs'],
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    summary: 'Brand assets, social channels, and outreach guides.',
    items: [
      {
        id: 'website-seo',
        label: 'Website SEO',
        title: 'Website SEO',
        eyebrow: 'Marketing',
        description: 'Notes for page titles, descriptions, and basic search optimization checks.',
        preview: 'Attach screenshots of audit results and the SEO checklist here.',
        bullets: ['Metadata', 'Page speed', 'Accessibility'],
        links: ['SEO checklist'],
      },
      {
        id: 'youtube',
        label: 'YouTube',
        title: 'YouTube',
        eyebrow: 'Marketing',
        description: 'Publishing workflow, thumbnails, and video descriptions for the channel.',
        preview: 'A content calendar or video pipeline works well here.',
        bullets: ['Upload flow', 'Thumbnail sizing', 'Description template'],
        links: ['Channel guide'],
      },
      {
        id: 'social-posts',
        label: 'Social Posts',
        title: 'Social Posts',
        eyebrow: 'Marketing',
        description: 'Reusable templates for posts, captions, and campaign planning.',
        preview: 'Use this area for brand templates and examples.',
        bullets: ['Post calendar', 'Caption tone', 'Brand kit'],
        links: ['Template pack'],
      },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    summary: 'Coordinator notes, permissions, and internal operations.',
    items: [
      {
        id: 'intern-coordinator',
        label: 'Intern Coordinator',
        title: 'Intern Coordinator',
        eyebrow: 'Administration',
        description: 'The role overview and checklist for the intern coordinator position.',
        preview: 'Add SOPs, task handoff notes, and weekly responsibilities here.',
        bullets: ['Weekly review', 'Task assignment', 'Escalation path'],
        links: ['Coordinator SOP'],
      },
      {
        id: 'volunteer-coordinator',
        label: 'Volunteer Coordinator',
        title: 'Volunteer Coordinator',
        eyebrow: 'Administration',
        description: 'Support materials for volunteer coordination, approvals, and tracking.',
        preview: 'A quick reference card is ideal for this section.',
        bullets: ['Approval flow', 'Scheduling', 'Follow-ups'],
        links: ['Coordinator notes'],
      },
      {
        id: 'discord-manager',
        label: 'Discord Manager',
        title: 'Discord Manager',
        eyebrow: 'Administration',
        description: 'Server management guidance for moderators and program leads.',
        preview: 'Include moderation rules, channel maps, and escalation steps.',
        bullets: ['Moderation', 'Roles', 'Channel setup'],
        links: ['Server rules'],
      },
      {
        id: 'intern-manager',
        label: 'Intern Manager',
        title: 'Intern Manager',
        eyebrow: 'Administration',
        description: 'How intern managers review work, organize tasks, and communicate updates.',
        preview: 'A task dashboard or status board belongs here.',
        bullets: ['Status tracking', 'Feedback', 'Deliverables'],
        links: ['Manager dashboard'],
      },
    ],
  },
];

const Resources = () => {
  const [activeGroupId, setActiveGroupId] = useState(resourceGroups[0].id);
  const [activeItemId, setActiveItemId] = useState(resourceGroups[0].items[0].id);

  const activeGroup = useMemo(() => {
    return resourceGroups.find((group) => group.id === activeGroupId) ?? resourceGroups[0];
  }, [activeGroupId]);

  const activeItem = useMemo(() => {
    return activeGroup.items.find((item) => item.id === activeItemId) ?? activeGroup.items[0];
  }, [activeGroup, activeItemId]);

  const selectGroup = (groupId) => {
    const nextGroup = resourceGroups.find((group) => group.id === groupId);
    if (!nextGroup) {
      return;
    }

    setActiveGroupId(nextGroup.id);
    setActiveItemId(nextGroup.items[0].id);
  };

  return (
    <div className="resources-page">
      <NavBarAdmin />
      <div className="resources-shell">
        <main className="resources-layout">
          <aside className="resources-sidebar" aria-label="Resource categories">
            {resourceGroups.map((group) => (
              <section key={group.id} className={group.id === activeGroup.id ? 'group-card active' : 'group-card'}>
                <button type="button" className="group-button" onClick={() => selectGroup(group.id)}>
                  <span>
                    <strong>{group.label}</strong>
                    <small>{group.summary}</small>
                  </span>
                </button>

                <ul>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={item.id === activeItem.id && group.id === activeGroup.id ? 'sidebar-link active' : 'sidebar-link'}
                        onClick={() => {
                          selectGroup(group.id);
                          setActiveItemId(item.id);
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </aside>

          <section className="resources-content" aria-live="polite">
            <h2>{activeItem.title}</h2>

            <div className="resource-preview">
              <span className="resource-preview-badge">{activeItem.eyebrow}</span>
              <div className="resource-preview-frame">
                <p>[Resource (video, flowchart, doc, etc.)]</p>
                <span>{activeItem.preview}</span>
              </div>
            </div>

            <div className="resource-details">
              <div>
                <h3>What this covers</h3>
                <p>{activeItem.description}</p>
              </div>

              <div>
                <h3>Quick links</h3>
                <div className="resource-link-stack">
                  {activeItem.links.map((linkLabel) => (
                    <button key={linkLabel} type="button">
                      <span>{linkLabel}</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="resource-bullets">
              {activeItem.bullets.map((bullet) => (
                <article key={bullet}>
                  <FontAwesomeIcon icon={faLayerGroup} />
                  <span>{bullet}</span>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resources;