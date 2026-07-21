
-- Categories (project categories like Heart, Neurology, etc.)
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);

-- Diseases
CREATE TABLE public.diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text,
  severity text,
  age_group text,
  risk_level text,
  short_description text,
  description text,
  symptoms text[] DEFAULT '{}',
  causes text[] DEFAULT '{}',
  diagnosis text,
  treatment text,
  prevention text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.diseases TO anon, authenticated;
GRANT ALL ON public.diseases TO service_role;
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read diseases" ON public.diseases FOR SELECT USING (true);

-- Diagnostic tools
CREATE TABLE public.tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text,
  description text,
  advantages text[] DEFAULT '{}',
  limitations text[] DEFAULT '{}',
  cost text,
  applications text[] DEFAULT '{}',
  technology text,
  status text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tools TO anon, authenticated;
GRANT ALL ON public.tools TO service_role;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read tools" ON public.tools FOR SELECT USING (true);

-- Team
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  bio text,
  avatar_url text,
  linkedin_url text,
  github_url text,
  email text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read team" ON public.team_members FOR SELECT USING (true);

-- FAQs
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);

-- Timeline
CREATE TABLE public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date text NOT NULL,
  title text NOT NULL,
  description text,
  event_type text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.timeline_events TO anon, authenticated;
GRANT ALL ON public.timeline_events TO service_role;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read timeline" ON public.timeline_events FOR SELECT USING (true);

-- Stats
CREATE TABLE public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value numeric NOT NULL,
  suffix text,
  icon text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stats TO anon, authenticated;
GRANT ALL ON public.stats TO service_role;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read stats" ON public.stats FOR SELECT USING (true);

-- Seed data
INSERT INTO public.categories (slug, name, description, icon, sort_order) VALUES
  ('heart', 'Heart Diagnosis', 'Cardiac imaging, ECG analysis, and cardiovascular risk assessment.', 'HeartPulse', 1),
  ('diabetes', 'Diabetes', 'Continuous glucose monitoring and metabolic risk profiling.', 'Droplet', 2),
  ('neurology', 'Neurology', 'Brain, spine and nervous-system diagnostic instrumentation.', 'Brain', 3),
  ('cancer', 'Cancer Detection', 'Early tumor detection through imaging and biomarker analysis.', 'Ribbon', 4),
  ('mental', 'Mental Health', 'Objective mental-health screening and monitoring tools.', 'Sparkles', 5),
  ('eye', 'Eye Care', 'Retinal imaging and vision diagnostics.', 'Eye', 6),
  ('dental', 'Dental', 'Oral imaging and AI-assisted dental assessment.', 'Smile', 7),
  ('respiratory', 'Respiratory', 'Lung function testing and airway diagnostics.', 'Wind', 8),
  ('infectious', 'Infectious Diseases', 'Rapid pathogen detection and outbreak surveillance.', 'Bug', 9);

INSERT INTO public.diseases (slug, name, category, severity, age_group, risk_level, short_description, description, symptoms, causes, diagnosis, treatment, prevention, sort_order) VALUES
  ('coronary-artery-disease','Coronary Artery Disease','Heart','High','Adults 40+','High',
   'Narrowing of coronary arteries reducing blood flow to the heart.',
   'Coronary artery disease develops when the major blood vessels that supply your heart become damaged or diseased.',
   ARRAY['Chest pain','Shortness of breath','Fatigue','Irregular heartbeat'],
   ARRAY['Atherosclerosis','High blood pressure','Smoking','Diabetes'],
   'ECG, stress test, coronary angiography, cardiac CT.',
   'Lifestyle changes, medications, angioplasty, bypass surgery.',
   'Balanced diet, exercise, no smoking, blood pressure control.', 1),
  ('type-2-diabetes','Type 2 Diabetes','Diabetes','Moderate','Adults','High',
   'Chronic condition affecting how the body processes glucose.',
   'Type 2 diabetes impairs how your body regulates and uses glucose as fuel.',
   ARRAY['Increased thirst','Frequent urination','Fatigue','Blurred vision'],
   ARRAY['Insulin resistance','Genetics','Obesity','Sedentary lifestyle'],
   'Fasting glucose, HbA1c, oral glucose tolerance test.',
   'Diet, exercise, oral medications, insulin therapy.',
   'Healthy weight, active lifestyle, balanced nutrition.', 2),
  ('alzheimers','Alzheimer''s Disease','Neurology','High','Seniors 65+','Moderate',
   'Progressive neurological disorder causing memory and cognitive decline.',
   'Alzheimer''s is the most common cause of dementia, affecting memory, thinking and behavior.',
   ARRAY['Memory loss','Confusion','Difficulty planning','Personality changes'],
   ARRAY['Beta-amyloid plaques','Genetics','Age','Cardiovascular risk factors'],
   'Cognitive tests, MRI, PET imaging, CSF biomarkers.',
   'Cholinesterase inhibitors, memantine, supportive care.',
   'Mental activity, cardiovascular health, social engagement.', 3),
  ('lung-cancer','Lung Cancer','Cancer','Critical','Adults 50+','Critical',
   'Malignant tumor originating in the lungs.',
   'Lung cancer begins in the lungs and is the leading cause of cancer death worldwide.',
   ARRAY['Persistent cough','Chest pain','Weight loss','Coughing blood'],
   ARRAY['Smoking','Radon exposure','Air pollution','Genetics'],
   'Low-dose CT screening, biopsy, PET-CT staging.',
   'Surgery, chemotherapy, radiation, immunotherapy.',
   'Avoid smoking, reduce radon exposure, air quality.', 4),
  ('depression','Major Depression','Mental Health','Moderate','All ages','Moderate',
   'Persistent mood disorder affecting daily function.',
   'Major depressive disorder is a common and serious medical illness that negatively affects how you feel.',
   ARRAY['Persistent sadness','Loss of interest','Sleep changes','Fatigue'],
   ARRAY['Neurotransmitter imbalance','Genetics','Trauma','Chronic stress'],
   'Clinical interview, PHQ-9, structured questionnaires.',
   'Therapy, SSRIs, lifestyle changes.',
   'Social connection, exercise, stress management.', 5),
  ('glaucoma','Glaucoma','Eye Care','High','Adults 40+','Moderate',
   'Optic nerve damage often linked to elevated eye pressure.',
   'Glaucoma damages the optic nerve, often due to abnormally high pressure in your eye.',
   ARRAY['Peripheral vision loss','Halos around lights','Eye pain','Blurred vision'],
   ARRAY['High intraocular pressure','Age','Genetics','Diabetes'],
   'Tonometry, OCT, visual field test.',
   'Eye drops, laser therapy, surgery.',
   'Regular eye exams, controlling blood pressure.', 6);

INSERT INTO public.tools (slug, name, tagline, description, advantages, limitations, cost, applications, technology, status, sort_order) VALUES
  ('ecg-ai','AI-Assisted ECG','Deep learning on 12-lead ECG',
   'A portable ECG that streams 12-lead data into a neural network for instant arrhythmia and ischemia detection.',
   ARRAY['Portable','Real-time analysis','High sensitivity','Cloud sync'],
   ARRAY['Requires clean skin contact','Needs periodic calibration'],
   '$', ARRAY['Emergency triage','Remote monitoring','Preventive checkups'],
   'CNN + Transformer models on edge hardware','Prototype v3', 1),
  ('retina-scanner','Retina AI Scanner','Diabetic retinopathy in 10 seconds',
   'Handheld fundus camera pairing high-resolution optics with an AI classifier for early diabetic retinopathy detection.',
   ARRAY['No dilation','Instant grading','Low-cost hardware','Offline capable'],
   ARRAY['Requires trained operator','Limited to retinal conditions'],
   '$$', ARRAY['Community screening','Diabetes clinics','Rural outreach'],
   'Vision transformer, custom CMOS sensor','Field trials', 2),
  ('smart-stetho','Smart Stethoscope','Acoustic AI for lung & heart',
   'Digital stethoscope that records, denoises, and classifies pulmonary and cardiac sounds.',
   ARRAY['Bluetooth streaming','Noise cancellation','Auto-classification'],
   ARRAY['Battery dependency'],
   '$', ARRAY['General practice','Pediatrics','Telemedicine'],
   'MEMS mic + spectrogram CNN','Beta', 3),
  ('breath-analyzer','Breath Biomarker Analyzer','Early cancer signal from a single breath',
   'Non-invasive breath sensor array detecting volatile organic compounds linked to early-stage disease.',
   ARRAY['Non-invasive','Rapid results','Low cost per test'],
   ARRAY['Research grade','Requires validation'],
   '$$$', ARRAY['Screening clinics','Occupational health'],
   'Metal-oxide sensor array + ML classifier','Research', 4);

INSERT INTO public.team_members (name, role, bio, linkedin_url, github_url, email, sort_order) VALUES
  ('Dr. Aarav Sharma','Founder & Lead Researcher','Biomedical engineer focused on AI-first diagnostics.','#','#','team@diagnosis.tools',1),
  ('Priya Nair','Head of Product Design','Turns clinical workflows into human-centered devices.','#','#','team@diagnosis.tools',2),
  ('Kenji Tanaka','ML Research Lead','Deep learning on physiological signals.','#','#','team@diagnosis.tools',3),
  ('Sofia Alvarez','Clinical Partnerships','Bridges research with real hospital deployments.','#','#','team@diagnosis.tools',4);

INSERT INTO public.faqs (question, answer, category, sort_order) VALUES
  ('What is Diagnosis Tools?','Diagnosis Tools is a research initiative building next-generation diagnostic equipment and AI-assisted medical devices.','General',1),
  ('Are the tools approved for clinical use?','Most tools are in research or prototype stages. Clinical trials and regulatory approvals are underway for selected devices.','Clinical',2),
  ('Can I contribute to the project?','Yes. We welcome researchers, engineers, clinicians and designers. Reach out via the contact form.','Contribute',3),
  ('How is patient data protected?','All prototypes follow privacy-by-design principles with on-device processing wherever possible.','Privacy',4),
  ('Is the AI symptom checker a diagnosis?','No. The symptom checker is educational only and does not replace professional medical advice.','Clinical',5);

INSERT INTO public.timeline_events (event_date, title, description, event_type, sort_order) VALUES
  ('2023 Q1','Project Kickoff','Diagnosis Tools initiative founded with a focus on accessible diagnostics.','milestone',1),
  ('2023 Q3','First ECG Prototype','Portable AI-assisted ECG prototype v1 demonstrated at university expo.','prototype',2),
  ('2024 Q2','Retina AI Field Trial','First community screening deployment across three rural clinics.','deployment',3),
  ('2024 Q4','Smart Stethoscope Beta','Bluetooth acoustic AI stethoscope enters closed beta with 20 clinics.','prototype',4),
  ('2025 Q3','Breath Biomarker Research','Volatile organic compound sensor array published for early cancer screening.','research',5),
  ('2026 Q2','Clinical Certification Track','Two flagship devices enter formal regulatory certification.','roadmap',6);

INSERT INTO public.stats (label, value, suffix, icon, sort_order) VALUES
  ('Diseases Modeled', 42, '+', 'Activity', 1),
  ('Diagnostic Tools', 12, '', 'Stethoscope', 2),
  ('Research Papers', 28, '+', 'BookOpen', 3),
  ('Clinical Partners', 15, '', 'Building2', 4);
